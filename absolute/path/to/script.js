// Should have this conditional
const container = document.getElementById('map-widget') || document.getElementById('map');
if (container) initMap();
mapboxgl.accessToken = 'pk.eyJ1...'; // Your token
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/furieromane/{{YOUR_STYLE_ID}}', // Custom style ID
  center: [12.4964, 41.9028],
  zoom: 12
});