import './CardTemplates.css';

// Artikel color mapping (German school standard)
const ARTIKEL_COLORS = {
    'der': '#4a90d9', // Blue for masculine
    'die': '#d94a4a', // Red for feminine
    'das': '#4ad97a', // Green for neutral
};

// Dynamic font size for long words
function getWordFontSize(word) {
    const len = word.length;
    if (len >= 16) return '1.6rem';
    if (len >= 14) return '1.8rem';
    if (len >= 12) return '2rem';
    return '2.5rem';
}

// Render example with bold target word
function renderExampleWithBold(example, word) {
    if (!example) return null;
    const parts = example.split(new RegExp(`(${word})`, 'gi'));
    return parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase()
            ? <strong key={i}>{part}</strong>
            : part
    );
}

// Render example with word blanked out (for practice mode)
function renderExampleBlanked(example, word) {
    if (!example) return null;
    return example.replace(new RegExp(word, 'gi'), '___');
}

// ============================================
// FRONT CARDS (for Learn Words mode)
// Now includes grammar; back side will only have Chinese
// ============================================

function NounCardFront({ word, data }) {
    const artikelColor = ARTIKEL_COLORS[data.grammar?.article] || '#888';
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content noun-card card-front-side">
            <div className="card-top-row">
                <div className="word-type-badge">Nomen</div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <div className="word-header">
                <span
                    className="artikel"
                    style={{ color: artikelColor, borderColor: artikelColor }}
                >
                    {data.grammar?.article}
                </span>
                <h2 className="word-main" style={{ fontSize }}>{word}</h2>
            </div>

            {/* Grammar on front */}
            {data.grammar?.plural && data.grammar.plural !== '-' && (
                <div className="grammar-section">
                    <div className="grammar-item">
                        <span className="grammar-label">Plural:</span>
                        <span className="grammar-value">{data.grammar.plural}</span>
                    </div>
                </div>
            )}

            {data.example && (
                <div className="example-section front-example">
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

        </div>
    );
}

function VerbCardFront({ word, data }) {
    const isIrregular = data.grammar?.stark === true;
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content verb-card card-front-side">
            <div className="card-top-row">
                <div className="word-type-badge verb-badge">
                    Verb
                    {isIrregular && <span className="irregular-warning" title="Starkes Verb">💪</span>}
                </div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main verb-word" style={{ fontSize }}>{word}</h2>

            {/* Conjugation table on front */}
            <div className="conjugation-table">
                <div className="conjugation-row">
                    <span className="conj-label">Präsens:</span>
                    <span className="conj-value">{data.grammar?.prasens}</span>
                </div>
                <div className="conjugation-row">
                    <span className="conj-label">Präteritum:</span>
                    <span className="conj-value">{data.grammar?.prateritum}</span>
                </div>
                <div className="conjugation-row">
                    <span className="conj-label">Perfekt:</span>
                    <span className="conj-value">{data.grammar?.perfekt}</span>
                </div>
            </div>

            {data.example && (
                <div className="example-section front-example">
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

        </div>
    );
}

function AdjectiveCardFront({ word, data }) {
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content adjective-card card-front-side">
            <div className="card-top-row">
                <div className="word-type-badge adjective-badge">Adjektiv</div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main" style={{ fontSize }}>{word}</h2>

            {/* Comparative/Superlative on front */}
            <div className="grammar-section comparison-section">
                {data.grammar?.comparative && (
                    <div className="grammar-item">
                        <span className="grammar-label">Komparativ:</span>
                        <span className="grammar-value">{data.grammar.comparative}</span>
                    </div>
                )}
                {data.grammar?.superlative && (
                    <div className="grammar-item">
                        <span className="grammar-label">Superlativ:</span>
                        <span className="grammar-value">{data.grammar.superlative}</span>
                    </div>
                )}
            </div>

            {data.example && (
                <div className="example-section front-example">
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

        </div>
    );
}

function OtherCardFront({ word, data }) {
    const typeLabels = {
        'adverb': 'Adverb',
        'pronomen': 'Pronomen',
        'anderen': 'Andere',
    };
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content other-card card-front-side">
            <div className="card-top-row">
                <div className="word-type-badge other-badge">
                    {typeLabels[data.type] || data.type}
                </div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main" style={{ fontSize }}>{word}</h2>

            {data.example && (
                <div className="example-section front-example">
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

        </div>
    );
}

// Front card router
function CardFront({ word, data }) {
    switch (data.type) {
        case 'norm':
            return <NounCardFront word={word} data={data} />;
        case 'verb':
            return <VerbCardFront word={word} data={data} />;
        case 'adjektive':
            return <AdjectiveCardFront word={word} data={data} />;
        default:
            return <OtherCardFront word={word} data={data} />;
    }
}

// ============================================
// BACK CARDS (for Learn Words mode)
// Chinese translation ONLY
// ============================================

function CardBack({ word, data }) {
    return (
        <div className="card-content card-back-side chinese-only-back">
            <div className="chinese-translation-large">{data.cn}</div>
            <div className="tap-hint">Tap to flip back</div>
        </div>
    );
}

// ============================================
// PRACTICE BACK CARDS (NO Chinese translation)
// Shows full word + grammar after guessing
// ============================================

function NounCardPracticeBack({ word, data }) {
    const artikelColor = ARTIKEL_COLORS[data.grammar?.article] || '#888';
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content noun-card card-back-side">
            <div className="card-top-row">
                <div className="word-type-badge">Nomen</div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <div className="word-header">
                <span
                    className="artikel"
                    style={{ color: artikelColor, borderColor: artikelColor }}
                >
                    {data.grammar?.article}
                </span>
                <h2 className="word-main" style={{ fontSize }}>{word}</h2>
            </div>

            <div className="grammar-section">
                {data.grammar?.plural && data.grammar.plural !== '-' && (
                    <div className="grammar-item">
                        <span className="grammar-label">Plural:</span>
                        <span className="grammar-value">{data.grammar.plural}</span>
                    </div>
                )}
            </div>

            {data.example && (
                <div className="example-section">
                    <div className="example-label">Beispiel:</div>
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

            <div className="tap-hint">Tap to flip back</div>
        </div>
    );
}

function VerbCardPracticeBack({ word, data }) {
    const isIrregular = data.grammar?.stark === true;
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content verb-card card-back-side">
            <div className="card-top-row">
                <div className="word-type-badge verb-badge">
                    Verb
                    {isIrregular && <span className="irregular-warning" title="Starkes Verb">💪</span>}
                </div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main verb-word" style={{ fontSize }}>{word}</h2>

            <div className="conjugation-table">
                <div className="conjugation-row">
                    <span className="conj-label">Präsens:</span>
                    <span className="conj-value">{data.grammar?.prasens}</span>
                </div>
                <div className="conjugation-row">
                    <span className="conj-label">Präteritum:</span>
                    <span className="conj-value">{data.grammar?.prateritum}</span>
                </div>
                <div className="conjugation-row">
                    <span className="conj-label">Perfekt:</span>
                    <span className="conj-value">{data.grammar?.perfekt}</span>
                </div>
            </div>

            {data.example && (
                <div className="example-section">
                    <div className="example-label">Beispiel:</div>
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

            <div className="tap-hint">Tap to flip back</div>
        </div>
    );
}

function AdjectiveCardPracticeBack({ word, data }) {
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content adjective-card card-back-side">
            <div className="card-top-row">
                <div className="word-type-badge adjective-badge">Adjektiv</div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main" style={{ fontSize }}>{word}</h2>

            <div className="grammar-section comparison-section">
                {data.grammar?.comparative && (
                    <div className="grammar-item">
                        <span className="grammar-label">Komparativ:</span>
                        <span className="grammar-value">{data.grammar.comparative}</span>
                    </div>
                )}
                {data.grammar?.superlative && (
                    <div className="grammar-item">
                        <span className="grammar-label">Superlativ:</span>
                        <span className="grammar-value">{data.grammar.superlative}</span>
                    </div>
                )}
            </div>

            {data.example && (
                <div className="example-section">
                    <div className="example-label">Beispiel:</div>
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

            <div className="tap-hint">Tap to flip back</div>
        </div>
    );
}

function OtherCardPracticeBack({ word, data }) {
    const typeLabels = {
        'adverb': 'Adverb',
        'pronomen': 'Pronomen',
        'anderen': 'Andere',
    };
    const fontSize = getWordFontSize(word);

    return (
        <div className="card-content other-card card-back-side">
            <div className="card-top-row">
                <div className="word-type-badge other-badge">
                    {typeLabels[data.type] || data.type}
                </div>
                {data.attention && (
                    <div className="attention-hint">
                        <span className="attention-icon">⚠️</span>
                        <span className="attention-text">{data.attention}</span>
                    </div>
                )}
            </div>

            <h2 className="word-main" style={{ fontSize }}>{word}</h2>

            {data.example && (
                <div className="example-section">
                    <div className="example-label">Beispiel:</div>
                    <div className="example-text">{renderExampleWithBold(data.example, word)}</div>
                </div>
            )}

            <div className="tap-hint">Tap to flip back</div>
        </div>
    );
}

// Practice back card router (NO Chinese)
function PracticeCardBack({ word, data }) {
    switch (data.type) {
        case 'norm':
            return <NounCardPracticeBack word={word} data={data} />;
        case 'verb':
            return <VerbCardPracticeBack word={word} data={data} />;
        case 'adjektive':
            return <AdjectiveCardPracticeBack word={word} data={data} />;
        default:
            return <OtherCardPracticeBack word={word} data={data} />;
    }
}

// Legacy DetailCard (for compatibility)
function DetailCard({ word, data }) {
    return <CardBack word={word} data={data} />;
}

export {
    DetailCard,
    CardFront,
    CardBack,
    PracticeCardBack,
    renderExampleBlanked,
    getWordFontSize,
    ARTIKEL_COLORS
};
