/**
 * Hide random characters in a word for flashcard mode
 * @param {string} word - The word to partially hide
 * @param {number} hidePercentage - Percentage of characters to hide (0-1)
 * @param {number} minVisible - Minimum number of characters that must remain visible
 * @returns {string} Word with some characters replaced by underscores
 */
export function hideCharacters(word, hidePercentage = 0.3, minVisible = 2) {
    const chars = word.split('');
    const totalChars = chars.length;

    // Calculate how many to hide
    let numToHide = Math.floor(totalChars * hidePercentage);

    // Ensure minimum visible characters
    const maxHideable = totalChars - minVisible;
    numToHide = Math.min(numToHide, maxHideable);
    numToHide = Math.max(0, numToHide);

    // Create array of indices that can be hidden
    const indices = chars.map((_, i) => i);

    // Shuffle indices randomly
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Hide the first numToHide indices
    const hideIndices = new Set(indices.slice(0, numToHide));

    // Build result string
    return chars.map((char, i) => hideIndices.has(i) ? '_' : char).join('');
}

/**
 * Shuffle an array randomly (Fisher-Yates)
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
