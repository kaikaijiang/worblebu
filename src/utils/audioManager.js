// Audio manager for flip sounds with mute toggle

class AudioManager {
    constructor() {
        this.muted = localStorage.getItem('worblebu_muted') === 'true';
        this.flipSound = null;
        this.clickSound = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Create flip sound using Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
    }

    playFlip() {
        if (this.muted || !this.initialized) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (e) {
            console.warn('Audio playback failed:', e);
        }
    }

    playClick() {
        if (this.muted || !this.initialized) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
        } catch (e) {
            console.warn('Audio playback failed:', e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('worblebu_muted', this.muted.toString());
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }
}

export const audioManager = new AudioManager();
