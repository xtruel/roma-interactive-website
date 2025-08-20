console.log('Script.js loaded - starting initialization...');

let map;

function initMap() {
  console.log('initMap called');
  
  // Check if Mapbox GL JS is loaded
  if (typeof mapboxgl === 'undefined') {
    console.error('Mapbox GL JS not loaded yet');
    // Try again in a moment
    setTimeout(initMap, 500);
    return;
  }

  console.log('Mapbox GL JS is loaded, proceeding...');

  // Set Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnVyaWVyb21hbmUiLCJhIjoiY21laW95N3B1MDRqajJycXZsNndraHlxNCJ9.Y5TZYShOj9thgJtQE3EVKA';

  // Find the map container on this page
  const container = document.getElementById('map-widget');
  
  if (!container) {
    console.error('Map container not found: map-widget');
    return;
  }

  console.log('Container found, initializing map...');

  try {
    // Center on Rome
    const roma = [12.4964, 41.9028];

    // Determine zoom level based on page
    let zoomLevel = 12;
    if (window.location.pathname.includes('/mappa.html')) {
      zoomLevel = 10; // Full map view
    }

    map = new mapboxgl.Map({
      container: 'map-widget',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: roma,
      zoom: zoomLevel
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Famous landmarks with custom markers
    const landmarks = [
      {
        coords: [12.4922, 41.8902],
        title: 'Colosseo',
        description: 'Iconic amphitheatre in the center of Rome',
        icon: '🏛️'
      },
      {
        coords: [12.4769, 41.8986],
        title: 'Pantheon',
        description: 'Ancient Roman temple, now a church',
        icon: '⛪'
      },
      {
        coords: [12.4833, 41.9009],
        title: 'Trevi Fountain',
        description: 'Famous baroque fountain - throw a coin!',
        icon: '⛲'
      },
      {
        coords: [12.4536, 41.9065],
        title: 'Spanish Steps',
        description: 'Monumental stairway of 135 steps',
        icon: '🪜'
      },
      {
        coords: [12.4534, 41.9029],
        title: 'Vatican City',
        description: 'St. Peter\'s Basilica and Sistine Chapel',
        icon: '⛪'
      },
      {
        coords: [12.4823, 41.8959],
        title: 'Roman Forum',
        description: 'Center of political, commercial and judicial life',
        icon: '🏛️'
      },
      {
        coords: [12.4923, 41.8906],
        title: 'Palatine Hill',
        description: 'Legendary birthplace of Rome',
        icon: '🏔️'
      },
      {
        coords: [12.4963, 41.9021],
        title: 'Piazza Navona',
        description: 'Beautiful baroque square with fountains',
        icon: '🏛️'
      },
      {
        coords: [12.4547, 41.9342],
        title: 'Stadio Olimpico',
        description: 'Home stadium of AS Roma and SS Lazio',
        icon: '⚽'
      }
    ];

    // Add markers for each landmark
    landmarks.forEach(landmark => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.style.cssText = `
        background: #e11d48;
        border: 2px solid #ffffff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
        cursor: pointer;
        transition: transform 0.2s ease;
      `;
      markerElement.textContent = landmark.icon;
      
      // Add hover effect
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.1)';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });

      // Create popup with Roma theme
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        className: 'roma-popup'
      })
        .setHTML(`
          <div style="
            font-family: Inter, sans-serif;
            background: #0b0f17;
            color: #e6edf3;
            border: 1px solid #e11d48;
            border-radius: 8px;
            padding: 12px;
          ">
            <b style="color: #e11d48;">${landmark.title}</b><br>
            <span style="color: #94a3b8;">${landmark.description}</span>
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat(landmark.coords)
        .setPopup(popup)
        .addTo(map);
    });
    
    // Add Roma-themed styling to the map
    map.on('load', () => {
      console.log('Mapbox map loaded successfully!');
      // Remove loading state
      if (container) {
        container.innerHTML = '';
        container.style.background = 'transparent';
      }
    });

    // Handle map errors
    map.on('error', (e) => {
      console.error('Mapbox error:', e);
      showMapError(container);
    });

  } catch (error) {
    console.error('Error initializing map:', error);
    showMapError(container);
  }
}

// Function to show error message if map fails to load
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

// Initialize map when page loads
window.addEventListener('load', () => {
  console.log('Window loaded, initializing map...');
  setTimeout(initMap, 100);
});

// Also try to initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing map...');
    setTimeout(initMap, 100);
  });
} else {
  console.log('DOM already ready, initializing map...');
  setTimeout(initMap, 100);
}