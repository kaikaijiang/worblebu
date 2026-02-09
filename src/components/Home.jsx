import './Home.css';

function Home({ onSelectMode }) {
    return (
        <div className="home">
            <h1 className="home-title">Worblebu</h1>
            <p className="home-subtitle">German Vocabulary Learning</p>

            <div className="mode-buttons">
                <button
                    className="mode-button learn-button"
                    onClick={() => onSelectMode('learn')}
                >
                    <span className="mode-icon">📖</span>
                    <span className="mode-label">Learn Words</span>
                    <span className="mode-description">View word details</span>
                </button>

                <button
                    className="mode-button practice-button"
                    onClick={() => onSelectMode('practice')}
                >
                    <span className="mode-icon">🎴</span>
                    <span className="mode-label">Practice Flashcards</span>
                    <span className="mode-description">Test your memory</span>
                </button>
            </div>
        </div>
    );
}

export default Home;
