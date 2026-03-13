import { supabase, USE_MOCK_DATA } from './supabase.js';

/*=============================================
=            Mock Database                    =
=============================================*/
export const DUMMY_MOVIES = [
    {
        id: 1,
        title: "The Cosmic Void",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 30m",
        rating: 4.8,
        release_date: "2026-04-15",
        poster_url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop",
        description: "A team of astronauts discover an anomaly at the edge of the solar system, plunging them into a mind-bending journey across dimensions.",
        trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 2,
        title: "Neon Shadows",
        genre: "Action",
        language: "English",
        duration: "2h 15m",
        rating: 4.5,
        release_date: "2026-02-10",
        poster_url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
        description: "In a cyberpunk metropolis, a rogue hacker must outrun a corporate syndicate to protect a powerful AI core.",
        trailer: "#"
    },
    {
        id: 3,
        title: "Desert Protocol",
        genre: "Thriller",
        language: "Spanish",
        duration: "1h 50m",
        rating: 4.2,
        release_date: "2026-03-05",
        poster_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
        description: "A tense survival thriller set in the arid wastelands where trust is the most expensive commodity.",
        trailer: "#"
    },
    {
        id: 4,
        title: "Echoes of Time",
        genre: "Drama",
        language: "English",
        duration: "2h 05m",
        rating: 4.6,
        release_date: "2025-11-20",
        poster_url: "https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop",
        description: "A heartfelt family drama intertwined with the mysterious mechanics of a grandfather clock that bends time.",
        trailer: "#"
    },
    {
        id: 5,
        title: "Laugh Riot",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 10m",
        rating: 4.3,
        release_date: "2026-01-15",
        poster_url: "https://images.unsplash.com/photo-1514301046162-8e8e7529ea4c?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1514301046162-8e8e7529ea4c?q=80&w=2070&auto=format&fit=crop",
        description: "Three misfits try to rob a high-end luxury Casino and everything that can go wrong, goes hilariously wrong.",
        trailer: "#"
    },
    {
        id: 6,
        title: "The Deep Ocean",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 45m",
        rating: 4.9,
        release_date: "2026-05-01",
        poster_url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop",
        banner_url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop",
        description: "A marine biologist discovers an underwater civilization that threatens the surface world's existence.",
        trailer: "#"
    }
];

/*=============================================
=            Movies Page Logic                =
=============================================*/
const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const languageFilter = document.getElementById('languageFilter');
const sortFilter = document.getElementById('sortFilter');
const loading = document.getElementById('loading');

let allMovies = [];

// Initialize if on movies page
if (moviesContainer) {
    document.addEventListener('DOMContentLoaded', fetchMovies);
    
    // Event Listeners for filters
    searchInput.addEventListener('input', applyFilters);
    genreFilter.addEventListener('change', applyFilters);
    languageFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

async function fetchMovies() {
    showLoading(true);
    try {
        if (USE_MOCK_DATA) {
            // Simulate network delay for premium feel
            await new Promise(r => setTimeout(r, 800));
            allMovies = [...DUMMY_MOVIES];
        } else {
            const { data, error } = await supabase.from('movies').select('*');
            if (error) throw error;
            allMovies = data || [];
            
            // Fallback to dummy if empty DB just for presentation
            if(allMovies.length === 0) {
                allMovies = [...DUMMY_MOVIES];
            }
        }
        
        applyFilters(); // Renders the movies initially based on default filters
    } catch (error) {
        console.error("Error fetching movies:", error);
        if(window.showToast) window.showToast("Failed to load movies. Showing offline catalog.", "error");
        allMovies = [...DUMMY_MOVIES];
        applyFilters();
    } finally {
        showLoading(false);
    }
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedLanguage = languageFilter.value;
    const sortMethod = sortFilter.value;

    let filtered = allMovies.filter(movie => {
        const matchSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
        const matchLang = selectedLanguage === 'all' || movie.language === selectedLanguage;
        return matchSearch && matchGenre && matchLang;
    });

    // Sorting
    if (sortMethod === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortMethod === 'name') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        // latest (by release date)
        filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    renderMovies(filtered);
}

function renderMovies(movies) {
    moviesContainer.innerHTML = '';
    
    if (movies.length === 0) {
        moviesContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-film empty-icon"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No movies found</h3>
                <p class="text-secondary">Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }

    movies.forEach((movie, index) => {
        // Stagger animation classes (1 to 5)
        const staggerClass = `stagger-${(index % 5) + 1}`;
        
        const card = document.createElement('div');
        card.className = `movie-card reveal active ${staggerClass}`;
        // Slight delay logic via DOM
        card.style.animationDelay = `${(index % 10) * 0.05}s`;
        
        card.onclick = () => window.location.href = `movie-details.html?id=${movie.id}`;
        
        card.innerHTML = `
            <div class="movie-card-img-wrap">
                <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                <div class="movie-overlay">
                    <span class="btn btn-primary" style="padding: 0.5rem; font-size: 0.8rem; margin-bottom: 1rem;">
                        <i class="fa-solid fa-ticket"></i> Book Tickets
                    </span>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title" title="${movie.title}">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.genre} • ${movie.duration}</span>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                </div>
            </div>
        `;
        
        moviesContainer.appendChild(card);
    });
}

function showLoading(show) {
    if (loading) loading.style.display = show ? 'block' : 'none';
    if (moviesContainer) moviesContainer.style.display = show ? 'none' : 'grid';
}

// Helper to get a single movie (used by other pages)
export async function getMovieById(id) {
    if (USE_MOCK_DATA) {
        return DUMMY_MOVIES.find(m => m.id == id);
    } else {
        const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
        if (error || !data) {
            // Fallback to dummy
            return DUMMY_MOVIES.find(m => m.id == id);
        }
        return data;
    }
}
