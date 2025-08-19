let map;

function initMap() {
  // Set Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnVyaWVyb21hbmUiLCJhIjoiY21laW95N3B1MDRqajJycXZsNndraHlxNCJ9.Y5TZYShOj9thgJtQE3EVKA';

  // Prefer the front-page map widget if present; fallback to #map (full page)
  const containerId = document.getElementById('map-widget') ? 'map-widget' : 'map';

  // Center on Rome
  const roma = [12.4964, 41.9028];

  map = new mapboxgl.Map({
    container: containerId,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: roma,
    zoom: 12
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
    }
  ];

  // Add markers for each landmark
  landmarks.forEach(landmark => {
    // Create custom marker element
    const markerElement = document.createElement('div');
    markerElement.style.cssText = `
      background: #1e293b;
      border: 2px solid #60a5fa;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
    `;
    markerElement.textContent = landmark.icon;

    // Create popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<div style="font-family: Inter, sans-serif;"><b>${landmark.title}</b><br>${landmark.description}</div>`);

    // Add marker to map
    new mapboxgl.Marker(markerElement)
      .setLngLat(landmark.coords)
      .setPopup(popup)
      .addTo(map);
  });
}

// Initialize map when page loads
window.addEventListener('load', () => {
  initMap();
});