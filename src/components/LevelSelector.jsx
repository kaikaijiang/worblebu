import { useState, useEffect } from 'react';
import './LevelSelector.css';

function LevelSelector({ mode, onSelectLevel, onBack }) {
    const [availableLevels, setAvailableLevels] = useState(['A1']);

    // In future, this could scan for available JSON files
    useEffect(() => {
        // For now, hardcode A1, but structure supports more levels
        setAvailableLevels(['A1']);
    }, []);

    const modeTitle = mode === 'learn' ? '📖 Learn Words' : '🎴 Practice Flashcards';

    return (
        <div className="level-selector">
            <button className="back-button" onClick={onBack}>
                ← Home
            </button>

            <h2 className="level-title">{modeTitle}</h2>
            <p className="level-subtitle">Select a level to begin</p>

            <div className="level-grid">
                {availableLevels.map(level => (
                    <button
                        key={level}
                        className="level-button"
                        onClick={() => onSelectLevel(level)}
                    >
                        <span className="level-name">{level}</span>
                        <span className="level-info">Beginner</span>
                    </button>
                ))}

                {/* Placeholder for future levels */}
                <button className="level-button level-locked" disabled>
                    <span className="level-name">A2</span>
                    <span className="level-info">Coming soon</span>
                </button>
                <button className="level-button level-locked" disabled>
                    <span className="level-name">B1</span>
                    <span className="level-info">Coming soon</span>
                </button>
            </div>
        </div>
    );
}

export default LevelSelector;
