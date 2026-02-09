import { useState, useEffect } from 'react';
import Home from './components/Home';
import LevelSelector from './components/LevelSelector';
import CardViewer from './components/CardViewer';
import FlashCard from './components/FlashCard';
import './App.css';

function App() {
  const [screen, setScreen] = useState('home'); // home, selectLevel, learn, practice
  const [mode, setMode] = useState(null); // learn, practice
  const [level, setLevel] = useState(null);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load words when level is selected
  useEffect(() => {
    if (level) {
      setLoading(true);
      setError(null);

      fetch(`/${level}.json`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load words');
          return res.json();
        })
        .then(data => {
          // Convert object to array of [word, data] pairs
          const wordArray = Object.entries(data);
          setWords(wordArray);
          setLoading(false);

          // Navigate to the appropriate mode
          if (mode === 'learn') {
            setScreen('learn');
          } else if (mode === 'practice') {
            setScreen('practice');
          }
        })
        .catch(err => {
          console.error('Error loading words:', err);
          setError('Failed to load vocabulary. Please try again.');
          setLoading(false);
        });
    }
  }, [level, mode]);

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    setScreen('selectLevel');
  };

  const handleSelectLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    // Loading effect will happen via useEffect
  };

  const handleGoHome = () => {
    setScreen('home');
    setMode(null);
    setLevel(null);
    setWords([]);
    setError(null);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="app">
        <div className="error-screen">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={handleGoHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <Home onSelectMode={handleSelectMode} />
      )}

      {screen === 'selectLevel' && (
        <LevelSelector
          mode={mode}
          onSelectLevel={handleSelectLevel}
          onBack={handleGoHome}
        />
      )}

      {screen === 'learn' && words.length > 0 && (
        <CardViewer
          words={words}
          onBack={handleGoHome}
        />
      )}

      {screen === 'practice' && words.length > 0 && (
        <FlashCard
          words={words}
          onBack={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
