import { useState, useEffect, useMemo } from 'react';
import { PracticeCardBack, renderExampleBlanked, getWordFontSize, ARTIKEL_COLORS } from './CardTemplates';
import { hideCharacters, shuffleArray } from '../utils/hideCharacters';
import { audioManager } from '../utils/audioManager';
import './FlashCard.css';

function FlashCard({ words, onBack }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMuted, setIsMuted] = useState(audioManager.isMuted());

    // Shuffle words on mount
    const shuffledWords = useMemo(() => shuffleArray(words), [words]);

    // Initialize audio on first interaction
    useEffect(() => {
        const initAudio = () => {
            audioManager.init();
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('click', initAudio);
        return () => document.removeEventListener('click', initAudio);
    }, []);

    const currentWord = shuffledWords[currentIndex];
    const wordName = currentWord ? currentWord[0] : '';
    const wordData = currentWord ? currentWord[1] : {};

    // Generate hidden version of word (35% hiding rate)
    const hiddenWord = useMemo(() => {
        if (!wordName) return '';
        return hideCharacters(wordName, 0.35, 2);
    }, [wordName]);

    // Get blanked example sentence
    const blankedExample = useMemo(() => {
        if (!wordData.example) return '';
        return renderExampleBlanked(wordData.example, wordName);
    }, [wordData.example, wordName]);

    // Toggle flip on click (both sides)
    const handleFlip = () => {
        audioManager.playFlip();
        setIsFlipped(prev => !prev);
    };

    const handleNext = () => {
        audioManager.playClick();
        setIsFlipped(false); // Auto-flip back
        setCurrentIndex(prev => (prev + 1) % shuffledWords.length);
    };

    const handlePrev = () => {
        audioManager.playClick();
        setIsFlipped(false); // Auto-flip back
        setCurrentIndex(prev => (prev - 1 + shuffledWords.length) % shuffledWords.length);
    };

    const toggleMute = () => {
        const newMuted = audioManager.toggleMute();
        setIsMuted(newMuted);
    };

    if (!currentWord) {
        return <div className="loading">Loading...</div>;
    }

    const wordTypeLabels = {
        'norm': 'Nomen',
        'verb': 'Verb',
        'adjektive': 'Adjektiv',
        'adverb': 'Adverb',
        'pronomen': 'Pronomen',
        'anderen': 'Andere',
    };

    const fontSize = getWordFontSize(wordName);
    const artikelColor = wordData.type === 'norm' ? ARTIKEL_COLORS[wordData.grammar?.article] : null;

    return (
        <div className="flashcard-container">
            <div className="flashcard-header">
                <button className="back-button" onClick={onBack}>
                    ← Home
                </button>

                <div className="progress-info">
                    {currentIndex + 1} / {shuffledWords.length}
                </div>

                <button className="mute-button" onClick={toggleMute}>
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>

            <div className="flashcard-main">
                <button
                    className="nav-arrow nav-prev"
                    onClick={handlePrev}
                    aria-label="Previous card"
                >
                    ‹
                </button>

                <div
                    className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                    onClick={handleFlip}
                >
                    <div className="flashcard-inner">
                        {/* Front side - Quiz (centered content) */}
                        <div className="flashcard-front">
                            <div className="quiz-content-centered">
                                <div className="quiz-type-badge">
                                    {wordTypeLabels[wordData.type] || wordData.type}
                                </div>

                                {/* Show artikel for nouns */}
                                {wordData.type === 'norm' && artikelColor && (
                                    <span
                                        className="quiz-artikel"
                                        style={{ color: artikelColor, borderColor: artikelColor }}
                                    >
                                        {wordData.grammar?.article}
                                    </span>
                                )}

                                <div className="quiz-word" style={{ fontSize }}>{hiddenWord}</div>

                                {/* Blanked example sentence as context clue */}
                                {blankedExample && (
                                    <div className="quiz-example">
                                        <span className="example-label">Beispiel:</span>
                                        <span className="example-text">{blankedExample}</span>
                                    </div>
                                )}

                                <div className="quiz-instruction">
                                    {isFlipped ? '' : 'Tap to reveal'}
                                </div>
                            </div>
                        </div>

                        {/* Back side - Answer (NO Chinese) */}
                        <div className="flashcard-back">
                            <PracticeCardBack word={wordName} data={wordData} />
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

export default FlashCard;
