let map, tilesLight, tilesSat;

function scrollToMap() {
  document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
}

function initMap() {
  // Center on Rome
  const roma = [41.9028, 12.4964];
  map = L.map('map-canvas', {
    center: roma,
    zoom: 12,
    zoomControl: true,
  });

  tilesLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  tilesSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0','mt1','mt2','mt3'],
    attribution: 'Imagery &copy; Google'
  });

  // Famous landmarks with custom markers
  const landmarks = [
    {
      coords: [41.8902, 12.4922],
      title: 'Colosseo',
      description: 'Iconic amphitheatre in the center of Rome',
      icon: '🏛️'
    },
    {
      coords: [41.8986, 12.4769],
      title: 'Pantheon',
      description: 'Ancient Roman temple, now a church',
      icon: '⛪'
    },
    {
      coords: [41.9009, 12.4833],
      title: 'Trevi Fountain',
      description: 'Famous baroque fountain - throw a coin!',
      icon: '⛲'
    },
    {
      coords: [41.9065, 12.4536],
      title: 'Spanish Steps',
      description: 'Monumental stairway of 135 steps',
      icon: '🪜'
    },
    {
      coords: [41.9029, 12.4534],
      title: 'Vatican City',
      description: 'St. Peter\'s Basilica and Sistine Chapel',
      icon: '⛪'
    },
    {
      coords: [41.8959, 12.4823],
      title: 'Roman Forum',
      description: 'Center of political, commercial and judicial life',
      icon: '🏛️'
    },
    {
      coords: [41.8906, 12.4923],
      title: 'Palatine Hill',
      description: 'Legendary birthplace of Rome',
      icon: '🏔️'
    },
    {
      coords: [41.9021, 12.4963],
      title: 'Piazza Navona',
      description: 'Beautiful baroque square with fountains',
      icon: '🏛️'
    }
  ];

  // Add markers for each landmark
  landmarks.forEach(landmark => {
    const customIcon = L.divIcon({
      html: `<div style="background: #1e293b; border: 2px solid #60a5fa; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${landmark.icon}</div>`,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    L.marker(landmark.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`<div style="font-family: Inter, sans-serif;"><b>${landmark.title}</b><br>${landmark.description}</div>`);
  });
}

function centerOnRome() {
  map.setView([41.9028, 12.4964], 12);
}

let satelliteOn = false;
function toggleSatellite() {
  satelliteOn = !satelliteOn;
  if (satelliteOn) {
    map.removeLayer(tilesLight);
    tilesSat.addTo(map);
  } else {
    map.removeLayer(tilesSat);
    tilesLight.addTo(map);
  }
}

// Audio player functionality
let isPlaying = false;
let currentTime = 0;
let duration = 180; // 3 minutes demo
let audioInterval;

function initAudioPlayer() {
  const playBtn = document.getElementById('playBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');

  // Set initial duration display
  durationEl.textContent = formatTime(duration);

  playBtn.addEventListener('click', togglePlay);
  volumeSlider.addEventListener('input', updateVolume);
  progressBar.addEventListener('click', seekAudio);
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
      currentTime = duration;
      togglePlay(); // Stop when finished
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
  
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + '%';
  currentTimeEl.textContent = formatTime(currentTime);
}

function seekAudio(e) {
  const progressBar = e.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const progressPercent = clickX / rect.width;
  
  currentTime = Math.floor(progressPercent * duration);
  updateProgress();
}

function updateVolume(e) {
  const volume = e.target.value;
  // In a real implementation, this would control actual audio volume
  console.log('Volume set to:', volume + '%');
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

window.addEventListener('load', () => {
  initMap();
  initAudioPlayer();
});