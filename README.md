# Roma Interactive - Map & Music Site

A beautiful, modern website that connects interactive maps of Rome with a music collection experience.

## Features

- 🗺️ **Interactive Map**: Leaflet-based map of Rome with markers and controls
- 🎵 **Music Section**: Dedicated space for your music collection
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌙 **Dark Theme**: Modern dark UI with blue accents
- 🔗 **Easy Navigation**: Smooth scrolling and intuitive navigation

## Project Structure

```
sito fixing mappa roma (linked)/
├── index.html          # Main homepage with map and sections
├── styles.css          # Global styles and theme
├── script.js           # JavaScript for map functionality
├── musica/             # Music section folder
│   └── index.html      # Music collection page
└── README.md           # This file
```

## Local Development

1. **Start Local Server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open in Browser:**
   Visit: http://localhost:8000

## Adding Music Content

The `musica/` folder is ready for your music content:

- Add audio files directly
- Create subfolders for categories
- Link to external music services (YouTube, SoundCloud, etc.)
- Edit `musica/index.html` to customize the music interface

## Connecting External Folders

To link your existing music folder from elsewhere on your PC:

### Option 1: Symbolic Link (Windows)
```cmd
mklink /J "musica-external" "C:\path\to\your\music\folder"
```

### Option 2: Copy Content
Simply copy your music files into the `musica/` folder.

## Git Repository Setup

Initialize and connect to GitHub:

```bash
git init
git add .
git commit -m "feat: initial commit - Roma Interactive site"
git branch -M main
git remote add origin https://github.com/yourusername/roma-interactive.git
git push -u origin main
```

## Map Customization

The map is centered on Rome and includes:
- Street view and satellite toggle
- Example marker at the Colosseum
- Zoom controls
- Responsive design

To add more markers, edit the `initMap()` function in `script.js`.

## Deployment

This site can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Technologies Used

- HTML5, CSS3, JavaScript
- Leaflet.js for maps
- Google Fonts (Inter)
- Font Awesome icons
- CSS Grid and Flexbox
- CSS custom properties (variables)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

Made with ❤️ for the eternal city of Rome.