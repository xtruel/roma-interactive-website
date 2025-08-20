// Mapbox implementation for Rome landmarks
console.log('Script loaded - starting Mapbox initialization...');
console.log('Current URL:', window.location.href);
console.log('Script version: 20250105');

let map;
let initialized = false;

// Set Mapbox access token - using the working token
mapboxgl.accessToken = 'pk.eyJ1IjoiZnVyaWVyb21hbmUiLCJhIjoiY21laW95N3B1MDRqajJycXZsNndraHlxNCJ9.Y5TZYShOj9thgJtQE3EVKA';
console.log('Mapbox token set:', mapboxgl.accessToken.substring(0, 20) + '...');

// Rome landmarks data
const romaLandmarks = [
    {
        name: "Colosseo",
        coordinates: [12.4922, 41.8902],
        description: "L'anfiteatro più famoso del mondo, simbolo di Roma antica."
    },
    {
        name: "Fontana di Trevi",
        coordinates: [12.4833, 41.9009],
        description: "La fontana barocca più celebre di Roma."
    },
    {
        name: "Pantheon",
        coordinates: [12.4769, 41.8986],
        description: "Tempio romano dedicato a tutti gli dei."
    },
    {
        name: "Piazza di Spagna",
        coordinates: [12.4823, 41.9058],
        description: "Famosa piazza con la scalinata di Trinità dei Monti."
    },
    {
        name: "Vaticano",
        coordinates: [12.4534, 41.9029],
        description: "Città del Vaticano e Basilica di San Pietro."
    },
    {
        name: "Fori Imperiali",
        coordinates: [12.4853, 41.8925],
        description: "Area archeologica con i resti dei fori romani."
    },
    {
        name: "Castel Sant'Angelo",
        coordinates: [12.4663, 41.9031],
        description: "Mausoleo di Adriano, fortezza e museo."
    },
    {
        name: "Piazza Navona",
        coordinates: [12.4731, 41.8992],
        description: "Piazza barocca con tre fontane magnifiche."
    },
    {
        name: "Stadio Olimpico",
        coordinates: [12.4547, 41.9342],
        description: "Stadio di casa dell'AS Roma e SS Lazio."
    }
];

function initMap() {
    console.log('Starting Mapbox initialization...');
    
    // Find map container - support both 'map' and 'map-widget'
    const mapContainer = document.getElementById('map') || document.getElementById('map-widget');
    if (!mapContainer) {
        console.error('Map container not found! Looking for "map" or "map-widget"');
        return;
    }

    console.log('Map container found:', mapContainer.id);

    if (initialized) {
        console.log('Map already initialized');
        return;
    }

    if (typeof mapboxgl === 'undefined') {
        console.error('Mapbox GL JS not loaded!');
        setTimeout(initMap, 1000);
        return;
    }

    // Ensure container has proper dimensions
    if (mapContainer.offsetHeight < 100) {
        console.log('Container height too small, waiting for layout...');
        setTimeout(initMap, 500);
        return;
    }

    try {
        console.log('Creating Mapbox map instance...');
        console.log('Container dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);

        // Initialize Mapbox map
        map = new mapboxgl.Map({
            container: mapContainer.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [12.4964, 41.9028],
            zoom: 12
        });

        map.on('error', (e) => {
            console.error('Mapbox error:', e);
            showMapError(mapContainer);
        });

        map.on('load', function() {
            console.log('Mapbox map fully loaded!');
            
            // Remove loading state but keep the map
            const loadingElement = mapContainer.querySelector('.map-loading');
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Add navigation controls
            map.addControl(new mapboxgl.NavigationControl(), 'top-right');
            
            // Add landmarks
            setTimeout(() => {
                addRomaLandmarks();
            }, 500);
            
            initialized = true;
        });
        
    } catch (error) {
        console.error('Failed to initialize Mapbox:', error);
        showMapError(mapContainer);
    }
}

function addRomaLandmarks() {
    console.log('Adding Rome landmarks...');
    
    if (!map) {
        console.error('Map not initialized, cannot add landmarks');
        return;
    }
    
    romaLandmarks.forEach((landmark) => {
        try {
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.style.cssText = `
                background-color: #DC143C;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                transition: transform 0.2s;
            `;
            
            markerElement.addEventListener('mouseenter', () => {
                markerElement.style.transform = 'scale(1.2)';
            });
            markerElement.addEventListener('mouseleave', () => {
                markerElement.style.transform = 'scale(1)';
            });
            
            const popup = new mapboxgl.Popup({
                offset: 30,
                closeButton: true,
                closeOnClick: false,
                maxWidth: '300px'
            }).setHTML(`
                <div style="padding: 15px; font-family: Arial, sans-serif;">
                    <h3 style="margin: 0 0 10px 0; color: #DC143C; font-size: 18px; font-weight: bold;">${landmark.name}</h3>
                    <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.5;">${landmark.description}</p>
                </div>
            `);
            
            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat(landmark.coordinates)
                .setPopup(popup)
                .addTo(map);
            
            console.log(`Added marker for ${landmark.name}`);
            
        } catch (error) {
            console.error(`Failed to add marker for ${landmark.name}:`, error);
        }
    });
}

function showMapError(container) {
    if (container) {
        container.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: var(--surface);
                color: var(--muted);
                text-align: center;
                padding: 2rem;
                font-family: Inter, sans-serif;
            ">
                <div>
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🗺️</div>
                    <div style="margin-bottom: 0.5rem; color: var(--text);">Mappa non disponibile</div>
                    <div style="font-size: 0.9rem;">Ricarica la pagina per riprovare</div>
                </div>
            </div>
        `;
    }
}

function attemptMapInit() {
    console.log('Attempting map initialization...');
    
    const mapContainer = document.getElementById('map') || document.getElementById('map-widget');
    if (mapContainer && typeof mapboxgl !== 'undefined') {
        initMap();
    } else {
        console.log('Waiting for DOM/Mapbox to be ready...');
        setTimeout(attemptMapInit, 500);
    }
}

// Sidebar functionality
console.log('Initializing sidebar functionality...');

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar || !sidebarToggle || !sidebarOverlay) {
        console.log('Sidebar elements not found, retrying...');
        setTimeout(initSidebar, 100);
        return;
    }
    
    console.log('Sidebar elements found, setting up event listeners...');
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
        console.log('Sidebar toggled');
    });
    
    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        console.log('Sidebar closed via overlay');
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
            document.body.classList.remove('sidebar-open');
            console.log('Sidebar closed via Escape key');
        }
    });
    
    // Handle sidebar navigation item clicks
    const sidebarNavItems = sidebar.querySelectorAll('.sidebar-nav-item');
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            sidebarNavItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('open');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
    
    console.log('Sidebar functionality initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        attemptMapInit();
        initSidebar();
    });
} else {
    attemptMapInit();
    initSidebar();
}

// Fallback initialization on window load
window.addEventListener('load', () => {
    if (!initialized) {
        console.log('Fallback initialization on window load');
        setTimeout(attemptMapInit, 1000);
    }
    
    if (!document.getElementById('sidebar')) {
        console.log('Fallback sidebar initialization on window load');
        setTimeout(initSidebar, 1000);
    }
});

console.log('Script loaded. Mapbox GL available:', typeof mapboxgl !== 'undefined');