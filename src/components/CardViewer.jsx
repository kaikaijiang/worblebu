import { useState, useEffect, useMemo } from 'react';
import { CardFront, CardBack } from './CardTemplates';
import { audioManager } from '../utils/audioManager';
import './CardViewer.css';

function CardViewer({ words, onBack }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMuted, setIsMuted] = useState(audioManager.isMuted());

    // Keep original order for learning mode
    const wordList = useMemo(() => words, [words]);

    // Initialize audio on first interaction
    useEffect(() => {
        const initAudio = () => {
            audioManager.init();
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('click', initAudio);
        return () => document.removeEventListener('click', initAudio);
    }, []);

    const currentWord = wordList[currentIndex];
    const wordName = currentWord ? currentWord[0] : '';
    const wordData = currentWord ? currentWord[1] : {};

    // Toggle flip on click (both sides)
    const handleFlip = () => {
        audioManager.playFlip();
        setIsFlipped(prev => !prev);
    };

    const handleNext = () => {
        audioManager.playClick();
        setIsFlipped(false); // Auto-flip back when navigating
        setCurrentIndex(prev => (prev + 1) % wordList.length);
    };

    const handlePrev = () => {
        audioManager.playClick();
        setIsFlipped(false); // Auto-flip back when navigating
        setCurrentIndex(prev => (prev - 1 + wordList.length) % wordList.length);
    };

    const toggleMute = () => {
        const newMuted = audioManager.toggleMute();
        setIsMuted(newMuted);
    };

    if (!currentWord) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="card-viewer-container">
            <div className="card-viewer-header">
                <button className="back-button" onClick={onBack}>
                    ← Home
                </button>

                <div className="progress-info">
                    {currentIndex + 1} / {wordList.length}
                </div>

                <button className="mute-button" onClick={toggleMute}>
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>

            <div className="card-viewer-main">
                <button
                    className="nav-arrow nav-prev"
                    onClick={handlePrev}
                    aria-label="Previous card"
                >
                    ‹
                </button>

                <div
                    className={`learn-flashcard ${isFlipped ? 'flipped' : ''}`}
                    onClick={handleFlip}
                >
                    <div className="learn-flashcard-inner">
                        {/* Front side - German word + grammar + example */}
                        <div className="learn-flashcard-front">
                            <CardFront word={wordName} data={wordData} />
                        </div>

                        {/* Back side - Chinese ONLY */}
                        <div className="learn-flashcard-back">
                            <CardBack word={wordName} data={wordData} />
                        </div>
                    </div>
                </div>

                <button
                    className="nav-arrow nav-next"
                    onClick={handleNext}
                    aria-label="Next card"
                >
                    ›
                </button>
            </div>

            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>
                    ← Previous
                </button>
                <button className="nav-button nav-button-primary" onClick={handleNext}>
                    Next →
                </button>
            </div>
        </div>
    );
}

export default CardViewer;
