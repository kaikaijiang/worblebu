# Worblebu 🌲📚

A fun, interactive German vocabulary learning app for primary school children. Built with React and Vite.

**[▶️ Live Demo](https://kaikaijiang.github.io/worblebu/)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 📖 Learn Words Mode
Browse vocabulary as interactive flashcards:
- **Front**: German word with article + example sentence
- **Back**: Chinese translation + grammar details
- Color-coded articles: 🔵 der | 🔴 die | 🟢 das

### 🎴 Practice Flashcards Mode
Test your German spelling:
- **Front**: Partially hidden word (e.g., `F__rz__g`) + context sentence
- **Back**: Full word + grammar details (no translations!)
- 50% of characters hidden randomly each session

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kaikaijiang/worblebu.git
cd worblebu

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

---

## 📁 Project Structure

```
worblebu/
├── public/
│   └── A1.json              # Vocabulary data (Level A1)
├── src/
│   ├── assets/
│   │   └── background.png   # Fantasy forest background
│   ├── components/
│   │   ├── Home.jsx         # Landing page
│   │   ├── LevelSelector.jsx
│   │   ├── CardViewer.jsx   # Learn mode cards
│   │   └── FlashCard.jsx    # Practice mode cards
│   ├── App.jsx
│   └── App.css
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Actions deployment
```

---

## 📊 Data Format

Vocabulary is stored in JSON files per level (`A1.json`, `A2.json`, etc.):

```json
{
  "Fahrzeug": {
    "cn": "车辆",
    "type": "norm",
    "example": "Das Fahrzeug fährt schnell.",
    "grammar": {
      "article": "das",
      "plural": "Fahrzeuge"
    }
  }
}
```

### Word Types
| Type | Description |
|------|-------------|
| `norm` | Nouns (with article & plural) |
| `verb` | Verbs (with conjugation) |
| `adjektive` | Adjectives (with comparative/superlative) |
| `adverb`, `pronomen`, `anderen` | Other word types |

---

## 🎨 Design

- **Target**: Primary school children + adults
- **Theme**: Playful fantasy forest with teal/green palette
- **Font**: Nunito (rounded, friendly)
- **Responsive**: Works on iPad, tablet, phone, and desktop

---

## 🚢 Deployment

This project auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

### Manual Deployment

1. Push to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Site will be live at `https://<username>.github.io/worblebu/`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Vanilla CSS |
| Deployment | GitHub Pages |

---

## 📝 License

MIT License - feel free to use and modify!

---

## 🙏 Acknowledgments

- Background artwork: Fantasy forest theme
- Font: [Nunito](https://fonts.google.com/specimen/Nunito) by Vernon Adams
