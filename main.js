// ==========================================
// Jiwya Special Moments - Main Interactive Engine
// ==========================================

// 1. Floating Ambient Particles (Hearts, Butterflies, Petals, Sparkles)
function startFloatingParticles() {
    const symbols = ['🤍', '🦋', '✨', '🌸', '💖', '🧿', '⭐'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        // Randomize initial position and timing
        particle.style.left = Math.random() * 95 + 'vw';
        const size = Math.random() * 18 + 14;
        particle.style.fontSize = size + 'px';
        const duration = Math.random() * 4 + 6;
        particle.style.animationDuration = duration + 's';
        particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 600);
}

// 2. Love Counter (Days since 14 October 2024)
function initLoveCounter() {
    const counterEl = document.getElementById('love-counter');
    if (!counterEl) return;

    // Start date: 14 October 2024
    const startDate = new Date(2024, 9, 14, 0, 0, 0); // Month is 0-indexed (9 = Oct)

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        counterEl.innerHTML = `
      <div class="counter-box"><span class="counter-val">${days}</span><span class="counter-lbl">Days</span></div>
      <div class="counter-box"><span class="counter-val">${hours}</span><span class="counter-lbl">Hours</span></div>
      <div class="counter-box"><span class="counter-val">${minutes}</span><span class="counter-lbl">Mins</span></div>
      <div class="counter-box"><span class="counter-val">${seconds}</span><span class="counter-lbl">Secs</span></div>
    `;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// 3. Romantic Soft Music Synthesizer & Audio Player (Pure Web Audio - 100% Offline & Reliable)
class RomanticAudio {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.timer = null;
        this.noteIndex = 0;

        // Tender romantic lullaby / music-box progression
        this.melody = [
            { f: 523.25, d: 0.6 }, // C5
            { f: 659.25, d: 0.6 }, // E5
            { f: 783.99, d: 0.6 }, // G5
            { f: 1046.50, d: 0.8 }, // C6

            { f: 392.00, d: 0.6 }, // G4
            { f: 493.88, d: 0.6 }, // B4
            { f: 587.33, d: 0.6 }, // D5
            { f: 783.99, d: 0.8 }, // G5

            { f: 440.00, d: 0.6 }, // A4
            { f: 523.25, d: 0.6 }, // C5
            { f: 659.25, d: 0.6 }, // E5
            { f: 880.00, d: 0.8 }, // A5

            { f: 349.23, d: 0.6 }, // F4
            { f: 440.00, d: 0.6 }, // A4
            { f: 523.25, d: 0.6 }, // C5
            { f: 698.46, d: 0.8 }, // F5

            { f: 523.25, d: 0.6 }, // C5
            { f: 659.25, d: 0.6 }, // E5
            { f: 783.99, d: 0.6 }, // G5
            { f: 659.25, d: 0.8 }, // E5

            { f: 349.23, d: 0.6 }, // F4
            { f: 440.00, d: 0.6 }, // A4
            { f: 523.25, d: 0.6 }, // C5
            { f: 587.33, d: 0.8 }, // D5

            { f: 392.00, d: 0.6 }, // G4
            { f: 493.88, d: 0.6 }, // B4
            { f: 587.33, d: 0.6 }, // D5
            { f: 783.99, d: 0.8 }  // G5
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, duration) {
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) { }
    }

    playCelebrationChime() {
        this.init();
        const chimes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        chimes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 1.2);
            }, idx * 120);
        });
    }

    playBlowCandleSound() {
        this.init();
        if (!this.ctx) return;
        try {
            const bufferSize = this.ctx.sampleRate * 0.4;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            whiteNoise.start();
        } catch (e) { }
    }

    step() {
        if (!this.isPlaying) return;
        const current = this.melody[this.noteIndex];
        this.playTone(current.f, current.d * 1.4);

        this.noteIndex = (this.noteIndex + 1) % this.melody.length;
        this.timer = setTimeout(() => this.step(), current.d * 1000);
    }

    toggle() {
        this.init();
        const disk = document.getElementById('music-disk');
        const label = document.getElementById('music-label');

        if (this.isPlaying) {
            this.isPlaying = false;
            clearTimeout(this.timer);
            if (disk) disk.classList.remove('playing');
            if (label) label.innerText = 'Play Melody 🎵';
        } else {
            this.isPlaying = true;
            if (disk) disk.classList.add('playing');
            if (label) label.innerText = 'Playing Our Song 🤍';
            this.step();
        }
    }
}

const audioController = new RomanticAudio();

// 4. Confetti Explosion
function fireConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#3b82f6', '#93c5fd', '#ffd166', '#ffffff'];
    const confettiCount = 80;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';

        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 300 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 150;

        confetti.style.setProperty('--vx', `${vx}px`);
        confetti.style.setProperty('--vy', `${vy}px`);
        confetti.style.animation = `confettiExplode ${Math.random() * 1.2 + 1.2}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

// 5. Build Floating Audio Player & Global Navbar
function injectGlobalUI() {
    const currentPath = window.location.pathname.toLowerCase();

    // Clean Navbar
    if (!document.querySelector('.romantic-nav')) {
        const nav = document.createElement('nav');
        nav.className = 'romantic-nav';
        nav.innerHTML = `
      <div class="nav-content">
        <a href="index.html" class="nav-brand">Jiwya 🤍🦋🧿</a>
        <div class="nav-links">
          <a href="index.html" class="nav-link ${currentPath.endsWith('index.html') || currentPath.endsWith('/') || !currentPath.includes('.html') ? 'active' : ''}">🏠 Home</a>
          <a href="moments.html" class="nav-link ${currentPath.includes('moments') ? 'active' : ''}">📖 Our Journey</a>
          <a href="gallery.html" class="nav-link ${currentPath.includes('gallery') ? 'active' : ''}">📸 Memories</a>
          <a href="surprise.html" class="nav-link ${currentPath.includes('surprise') ? 'active' : ''}">🎂 Birthday Special 💝</a>
        </div>
      </div>
    `;
        document.body.prepend(nav);
    }

    // Floating Music Player Widget
    if (!document.getElementById('music-player-widget')) {
        const player = document.createElement('div');
        player.id = 'music-player-widget';
        player.className = 'music-player-widget';
        player.innerHTML = `
      <div class="disk" id="music-disk" title="Click to play romantic melody">
        <span class="music-icon">🎵</span>
      </div>
      <div class="music-info">
        <span class="music-title" id="music-label">Play Melody 🎵</span>
        <span class="music-sub">Jiwya's Love Theme 🤍</span>
      </div>
    `;
        player.addEventListener('click', () => audioController.toggle());
        document.body.appendChild(player);
    }
}

// 6. Interactive Gallery Lightbox & Filter
function initGalleryLightbox() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    // Filter Buttons
    const filterWrap = document.createElement('div');
    filterWrap.className = 'gallery-filters';
    filterWrap.innerHTML = `
    <button class="filter-btn active" data-filter="all">All Memories ✨</button>
    <button class="filter-btn" data-filter="photo">Her Cutest Photos 💖</button>
    <button class="filter-btn" data-filter="video">Our Videos 🎬</button>
  `;
    gallery.parentNode.insertBefore(filterWrap, gallery);

    // Group items
    const items = Array.from(gallery.querySelectorAll('img, video'));
    items.forEach((item, index) => {
        const isVideo = item.tagName.toLowerCase() === 'video';
        const card = document.createElement('div');
        card.className = `gallery-card ${isVideo ? 'type-video' : 'type-photo'}`;

        // Add cute caption
        const caption = document.createElement('div');
        caption.className = 'card-overlay';
        caption.innerHTML = `<span>${isVideo ? '🎬 Our Memory' : '🤍 Pure Love'}</span>`;

        item.parentNode.insertBefore(card, item);
        card.appendChild(item);
        card.appendChild(caption);

        card.addEventListener('click', (e) => {
            // Allow playing inside card if user clicked directly on native video controls
            if (isVideo && e.target === item) {
                return;
            }
            openLightbox(index, items);
        });
    });

    // Filter functionality
    filterWrap.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            document.querySelectorAll('.gallery-card').forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'photo') {
                    card.style.display = card.classList.contains('type-photo') ? 'block' : 'none';
                } else if (filter === 'video') {
                    card.style.display = card.classList.contains('type-video') ? 'block' : 'none';
                }
            });
        });
    });

    // Lightbox Modal
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-container">
      <button class="lightbox-close" title="Close">✕</button>
      <button class="lightbox-prev" title="Previous">❮</button>
      <div class="lightbox-content" id="lightbox-content"></div>
      <button class="lightbox-next" title="Next">❯</button>
      <div class="lightbox-caption" id="lightbox-caption"></div>
    </div>
  `;
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    function openLightbox(idx, allItems) {
        currentIndex = idx;
        updateLightboxContent(allItems);
        lightbox.classList.add('active');
    }

    function updateLightboxContent(allItems) {
        const targetItem = allItems[currentIndex];
        const container = document.getElementById('lightbox-content');
        const caption = document.getElementById('lightbox-caption');
        container.innerHTML = '';

        if (targetItem.tagName.toLowerCase() === 'img') {
            const img = document.createElement('img');
            img.src = targetItem.src;
            img.alt = targetItem.alt || 'Memory';
            container.appendChild(img);
            caption.innerHTML = `💖 ${targetItem.alt || 'Cherished Memory'} • (${currentIndex + 1} of ${allItems.length})`;
        } else {
            const vid = document.createElement('video');
            vid.controls = true;
            vid.autoplay = true;
            const source = targetItem.querySelector('source');
            vid.src = source ? source.src : targetItem.src;
            container.appendChild(vid);
            caption.innerHTML = `🎬 A moment to replay forever • (${currentIndex + 1} of ${allItems.length})`;
        }
    }

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        const vid = lightbox.querySelector('video');
        if (vid) vid.pause();
    };

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxContent(items);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxContent(items);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateLightboxContent(items);
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % items.length;
            updateLightboxContent(items);
        }
    });
}

// 7. Interactive Birthday Cake, Envelope & Dodging Proposal
function initSurprisePage() {
    const cake = document.getElementById('interactive-cake');
    const candleFlames = document.querySelectorAll('.flame');
    const cakeInstruction = document.getElementById('cake-instruction');
    const envelope = document.getElementById('letter-envelope');
    const proposalYes = document.getElementById('proposal-yes');
    const proposalNo = document.getElementById('proposal-no');
    const proposalActions = document.getElementById('proposal-actions');

    // Interactive Birthday Cake
    if (cake) {
        let blownOut = false;
        cake.addEventListener('click', () => {
            if (blownOut) return;
            blownOut = true;

            // Sounds
            audioController.playBlowCandleSound();
            setTimeout(() => audioController.playCelebrationChime(), 350);

            // Extinguish flames with puff animation
            candleFlames.forEach(flame => {
                flame.classList.add('out');
            });

            // Confetti burst
            const rect = cake.getBoundingClientRect();
            fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

            if (cakeInstruction) {
                cakeInstruction.innerHTML = `
          ✨ <strong>YAY! Happy Birthday My Love! 🎂💖🎉</strong><br>
          <span style="font-size:0.95em; color:#0d3b66;">May all your wishes come true, and may every birthday bring you endless smiles with me 🤍</span>
        `;
            }

            // Scroll to letter smoothly
            if (envelope) {
                setTimeout(() => {
                    envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1200);
            }
        });
    }

    // Interactive Envelope
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
            audioController.playTone(659.25, 0.4);
        });
    }

    // Dodging "No" Button
    if (proposalNo && proposalActions) {
        let dodgeCount = 0;
        const cheekyMessages = [
            'Are you sure? 🥺',
            'Think again! 😜',
            'You cannot say no! 🙈',
            'Wrong choice my love! 💕',
            'Still trying? 🤍',
            'Only YES is allowed! ✨'
        ];

        const dodge = (e) => {
            e.preventDefault();
            dodgeCount++;
            const rect = proposalActions.getBoundingClientRect();
            const maxX = Math.max(10, rect.width - proposalNo.offsetWidth - 20);
            const maxY = 120;

            const randX = Math.floor(Math.random() * maxX);
            const randY = Math.floor(Math.random() * maxY) - 50;

            proposalNo.style.position = 'absolute';
            proposalNo.style.left = `${randX}px`;
            proposalNo.style.top = `${randY}px`;
            proposalNo.innerText = cheekyMessages[dodgeCount % cheekyMessages.length];

            // Grow the YES button
            if (proposalYes) {
                const currentScale = 1 + (dodgeCount * 0.08);
                proposalYes.style.transform = `scale(${Math.min(currentScale, 1.35)})`;
            }
        };

        proposalNo.addEventListener('mouseenter', dodge);
        proposalNo.addEventListener('touchstart', dodge);
    }

    // Grand YES Celebration
    if (proposalYes) {
        proposalYes.addEventListener('click', () => {
            const rect = proposalYes.getBoundingClientRect();
            fireConfetti(rect.left + rect.width / 2, rect.top);
            audioController.playCelebrationChime();

            setTimeout(() => fireConfetti(window.innerWidth * 0.25, window.innerHeight * 0.4), 250);
            setTimeout(() => fireConfetti(window.innerWidth * 0.75, window.innerHeight * 0.4), 500);
            setTimeout(() => fireConfetti(window.innerWidth * 0.5, window.innerHeight * 0.3), 750);

            // Show Romantic Modal
            const modal = document.createElement('div');
            modal.className = 'yes-modal';
            modal.innerHTML = `
        <div class="yes-modal-card">
          <div class="yes-heart-icon">💍🤍✨</div>
          <h2>She Said YES! 🤍</h2>
          <p>
            You just made me the happiest person in the universe!  
            I promise to love you, support you, listen to you, tease you, and choose you every single day forever and always.  
            <br><br>
            Happy Birthday My Queen! 🎂💖🧿
          </p>
          <button class="btn btn-close-modal" id="close-yes-modal">Forever & Always 🤍</button>
        </div>
      `;
            document.body.appendChild(modal);

            document.getElementById('close-yes-modal').addEventListener('click', () => {
                modal.remove();
            });
        });
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUI();
    startFloatingParticles();
    initLoveCounter();
    initGalleryLightbox();
    initSurprisePage();
});
