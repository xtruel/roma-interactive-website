let map;

function scrollToMap() {
  document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
}

function initMap() {
  // Set Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnVyaWVyb21hbmUiLCJhIjoiY21laW95N3B1MDRqajJrcXZsNndraHlxNCJ9.Y5TZYShOj9thgJtQE3EVKA';
  
  // Center on Rome (Mapbox uses [lng, lat] format)
  const roma = [12.4964, 41.9028];
  
  map = new mapboxgl.Map({
    container: 'map-canvas',
    style: 'mapbox://styles/furieromane/cmeeejl8900iu01s62io48hha', // Your custom style
    center: roma,
    zoom: 12
  });

  // Add navigation controls
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

function centerOnRome() {
  map.flyTo({
    center: [12.4964, 41.9028],
    zoom: 12
  });
}

let satelliteOn = false;
function toggleSatellite() {
  satelliteOn = !satelliteOn;
  
  if (satelliteOn) {
    // Switch to satellite style
    map.setStyle('mapbox://styles/mapbox/satellite-v9');
  } else {
    // Switch back to your custom style
    map.setStyle('mapbox://styles/furieromane/cmeeejl8900iu01s62io48hha');
  }
  
  // Re-add markers after style change
  map.once('styledata', () => {
    // Re-add all landmarks after style change
    const landmarks = [
      { coords: [12.4922, 41.8902], title: 'Colosseo', description: 'Iconic amphitheatre in the center of Rome', icon: '🏛️' },
      { coords: [12.4769, 41.8986], title: 'Pantheon', description: 'Ancient Roman temple, now a church', icon: '⛪' },
      { coords: [12.4833, 41.9009], title: 'Trevi Fountain', description: 'Famous baroque fountain - throw a coin!', icon: '⛲' },
      { coords: [12.4536, 41.9065], title: 'Spanish Steps', description: 'Monumental stairway of 135 steps', icon: '🪜' },
      { coords: [12.4534, 41.9029], title: 'Vatican City', description: 'St. Peter\'s Basilica and Sistine Chapel', icon: '⛪' },
      { coords: [12.4823, 41.8959], title: 'Roman Forum', description: 'Center of political, commercial and judicial life', icon: '🏛️' },
      { coords: [12.4923, 41.8906], title: 'Palatine Hill', description: 'Legendary birthplace of Rome', icon: '🏔️' },
      { coords: [12.4963, 41.9021], title: 'Piazza Navona', description: 'Beautiful baroque square with fountains', icon: '🏛️' }
    ];
    
    landmarks.forEach(landmark => {
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

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<div style="font-family: Inter, sans-serif;"><b>${landmark.title}</b><br>${landmark.description}</div>`);

      new mapboxgl.Marker(markerElement)
        .setLngLat(landmark.coords)
        .setPopup(popup)
        .addTo(map);
    });
  });
}

// Audio player functionality
let isPlaying = false;
let currentTime = 0;
let duration = 180; // 3 minutes demo
let audioInterval;

function initAudioPlayer() {
  const playBtn = document.getElementById('playBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const progressContainer = document.querySelector('.progress-container');
  
  playBtn.addEventListener('click', togglePlay);
  volumeSlider.addEventListener('input', updateVolume);
  progressContainer.addEventListener('click', seekAudio);
  
  // Initialize display
  document.getElementById('duration').textContent = formatTime(duration);
}

function togglePlay() {
  const playBtn = document.getElementById('playBtn');
  const icon = playBtn.querySelector('i');
  
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    icon.className = 'fas fa-pause';
    startAudioProgress();
  } else {
    icon.className = 'fas fa-play';
    stopAudioProgress();
  }
}

function startAudioProgress() {
  audioInterval = setInterval(() => {
    currentTime += 1;
    if (currentTime >= duration) {
      currentTime = 0;
      togglePlay();
    }
    updateProgress();
  }, 1000);
}

function stopAudioProgress() {
  clearInterval(audioInterval);
}

function updateProgress() {
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('currentTime');
  
  const percentage = (currentTime / duration) * 100;
  progress.style.width = percentage + '%';
  currentTimeEl.textContent = formatTime(currentTime);
}

function seekAudio(e) {
  const progressContainer = e.currentTarget;
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  
  currentTime = (clickX / width) * duration;
  updateProgress();
}

function updateVolume(e) {
  const volume = e.target.value;
  // In a real implementation, you would set the audio volume here
  console.log('Volume set to:', volume);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

window.addEventListener('load', () => {
  initMap();
  initAudioPlayer();
});