/**
 * URUHA RUSHIA - ALL-IN CINEMATIC MOTION ENGINE
 * Luminous Soul Particle Trail • Interactive 3D Holographic Tilt • Dual Atmosphere
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 0. ATMOSPHERE THEME SWITCHER (EMERALD DAWN / GOTHIC ECLIPSE)
    // =========================================================================
    const atmosphereBtn = document.getElementById('atmosphere-toggle');
    const atmosphereLabel = document.getElementById('atmosphere-label');

    function getThemeColorRGB() {
        return document.body.getAttribute('data-atmosphere') === 'gothic'
            ? '181, 104, 255'
            : '0, 229, 153';
    }

    const savedTheme = localStorage.getItem('rushia-atmosphere') || 'emerald';
    if (savedTheme === 'gothic') {
        document.body.setAttribute('data-atmosphere', 'gothic');
        if (atmosphereLabel) atmosphereLabel.textContent = '☾ Gothic Eclipse';
    }

    if (atmosphereBtn) {
        atmosphereBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-atmosphere');
            if (currentTheme === 'gothic') {
                document.body.removeAttribute('data-atmosphere');
                localStorage.setItem('rushia-atmosphere', 'emerald');
                if (atmosphereLabel) atmosphereLabel.textContent = '✦ Emerald Dawn';
            } else {
                document.body.setAttribute('data-atmosphere', 'gothic');
                localStorage.setItem('rushia-atmosphere', 'gothic');
                if (atmosphereLabel) atmosphereLabel.textContent = '☾ Gothic Eclipse';
            }
        });
    }

    // =========================================================================
    // 0.5. SECTION 01: INTERACTIVE TIME RELIQUARY MATRIX ENGINE
    // =========================================================================
    const epochPills = document.querySelectorAll('.epoch-pill');
    const reliquaryMainImg = document.getElementById('reliquary-main-img');
    const reliquaryCardTrigger = document.getElementById('reliquary-card-trigger');
    const reliquaryBadgeTag = document.getElementById('reliquary-badge-tag');
    const reliquaryFooterTitle = document.getElementById('reliquary-footer-title');
    const hudEraVal = document.getElementById('hud-era-val');
    const hudEssenceVal = document.getElementById('hud-essence-val');
    const hudImpactVal = document.getElementById('hud-impact-val');
    const reliquaryQuoteJp = document.getElementById('reliquary-quote-jp');
    const reliquaryQuoteEn = document.getElementById('reliquary-quote-en');
    const reliquaryChapterSub = document.getElementById('reliquary-chapter-sub');
    const reliquaryChapterTitle = document.getElementById('reliquary-chapter-title');
    const reliquaryChapterProse = document.getElementById('reliquary-chapter-prose');

    const EPOCH_DATA = [
        {
            src: 'assets/images/fanart_emerald_clean.png',
            badge: 'EPOCH 01 // 2019.08',
            title: 'Emerald Gaze (翡翠の眼差し)',
            caption: 'High-resolution close-up portrait highlighting Uruha Rushia\'s gentle crimson gaze, jade ribbons, and signature butterfly motifs.',
            tag: 'Epoch 01 • Genesis (2019)',
            footerTitle: 'Portrait in Emerald',
            eraVal: '2019.08 • Debut',
            essenceVal: 'Soul Butterflies & ASMR',
            impactVal: 'Genesis of Fandead',
            quoteJp: '「こんるし〜！今日もいっぱい愛してるよ！」',
            quoteEn: '“Across countless twilight streams, a solitary voice resonated into the hearts of millions.”',
            chapterSub: 'Chapter 01 • The Awakening',
            chapterTitle: 'Genesis of the Soul (魂の目覚め)',
            chapterProse: 'She stepped across the veil of the Netherworld in the summer of 2019 — a soft-spoken maiden trying her best to understand the human heart. What began as quiet whisper streams evolved into one of the most passionate, profound, and unforgettable cultural connections in virtual history.'
        },
        {
            src: 'assets/images/night_train.jpg',
            badge: 'EPOCH 02 // 2020.10',
            title: 'Midnight Railway (銀河夜行列車)',
            caption: 'Poetic illustration of Rushia embarking on a midnight starry locomotive through the celestial galaxy, accompanied by glowing soul butterflies.',
            tag: 'Epoch 02 • Resonance (2020)',
            footerTitle: 'Midnight Railway 1080p',
            eraVal: '2020.10 • Golden Era',
            essenceVal: 'Desk-slams & Screams',
            impactVal: '1,000,000+ Fandead',
            quoteJp: '「ふぁんでっど、ずっとずっと一緒だよ！」',
            quoteEn: '“A roaring storm of pure passion, laughter, and unbreakable devotion.”',
            chapterSub: 'Chapter 02 • The Golden Resonance',
            chapterTitle: 'Folklore of Screams & Solace (咆哮と癒やし)',
            chapterProse: 'From whisper-soft binaural ASMR streams that brought peace to hundreds of thousands of restless nights, to her iconic, earth-shaking metal shrieks and desk-slams that became legendary global folklore, Rushia poured every ounce of her soul into her audience.'
        },
        {
            src: 'assets/images/hero_wide_4k_butterfly.jpg',
            badge: 'EPOCH 03 // 2021–2022',
            title: 'Butterfly Realm (翡翠の蝶域)',
            caption: 'Monumental 4K masterwork capturing Uruha Rushia immersed in a mystical realm of glowing emerald butterflies and eternal starlight.',
            tag: 'Epoch 03 • Eternity (2021–2022)',
            footerTitle: 'Butterfly Realm 4K',
            eraVal: '2021–2022 • Eternal',
            essenceVal: 'Iris & Celestial Flight',
            impactVal: '1.6M+ Global Souls',
            quoteJp: '「心の中で、翡翠の蝶は舞い続ける。」',
            quoteEn: '“In the heart of every Fandead, the emerald butterfly dances forever.”',
            chapterSub: 'Chapter 03 • The Eternal Star',
            chapterTitle: 'Eternal Starlight & Legacy (不滅の輝き)',
            chapterProse: 'A legacy etched forever in digital history. Though times shift, the emerald butterfly never truly leaves. Her memory remains an eternal beacon of joy, love, and unwavering passion in the virtual sky.'
        }
    ];

    function switchEpoch(index) {
        const data = EPOCH_DATA[index];
        if (!data) return;

        epochPills.forEach((p, idx) => {
            if (idx === index) {
                p.classList.add('is-active');
                p.setAttribute('aria-selected', 'true');
            } else {
                p.classList.remove('is-active');
                p.setAttribute('aria-selected', 'false');
            }
        });

        if (reliquaryMainImg) {
            reliquaryMainImg.style.opacity = '0';
            setTimeout(() => {
                reliquaryMainImg.src = data.src;
                reliquaryMainImg.style.opacity = '1';
            }, 180);
        }

        if (reliquaryCardTrigger) {
            reliquaryCardTrigger.setAttribute('data-art-src', data.src);
            reliquaryCardTrigger.setAttribute('data-art-title', data.title);
            reliquaryCardTrigger.setAttribute('data-art-caption', data.caption);
            reliquaryCardTrigger.setAttribute('data-art-tag', data.tag);
        }

        if (reliquaryBadgeTag) reliquaryBadgeTag.textContent = data.badge;
        if (reliquaryFooterTitle) reliquaryFooterTitle.textContent = data.footerTitle;
        if (hudEraVal) hudEraVal.textContent = data.eraVal;
        if (hudEssenceVal) hudEssenceVal.textContent = data.essenceVal;
        if (hudImpactVal) hudImpactVal.textContent = data.impactVal;

        if (reliquaryQuoteJp) {
            reliquaryQuoteJp.style.opacity = '0';
            setTimeout(() => {
                reliquaryQuoteJp.textContent = data.quoteJp;
                reliquaryQuoteJp.style.opacity = '1';
            }, 180);
        }

        if (reliquaryQuoteEn) {
            reliquaryQuoteEn.style.opacity = '0';
            setTimeout(() => {
                reliquaryQuoteEn.textContent = data.quoteEn;
                reliquaryQuoteEn.style.opacity = '1';
            }, 180);
        }

        if (reliquaryChapterSub) reliquaryChapterSub.textContent = data.chapterSub;
        if (reliquaryChapterTitle) reliquaryChapterTitle.textContent = data.chapterTitle;

        if (reliquaryChapterProse) {
            reliquaryChapterProse.style.opacity = '0';
            setTimeout(() => {
                reliquaryChapterProse.textContent = data.chapterProse;
                reliquaryChapterProse.style.opacity = '1';
            }, 180);
        }
    }

    epochPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const idx = parseInt(pill.getAttribute('data-epoch') || '0', 10);
            switchEpoch(idx);
        });
    });

    // Web Audio API Celestial Chime Synthesizer
    const resonateBtn = document.getElementById('resonate-trigger-btn');
    let audioCtx = null;

    if (resonateBtn) {
        resonateBtn.addEventListener('click', () => {
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                // Play delicate angelic chime notes (E6, G#6, B6, E7)
                const now = audioCtx.currentTime;
                const freqs = [1318.51, 1661.22, 1975.53, 2637.02];

                freqs.forEach((freq, idx) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

                    gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.03);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);

                    osc.start(now + idx * 0.08);
                    osc.stop(now + idx * 0.08 + 1.3);
                });

                // Spawn sparkling butterfly soul particles on canvas
                const canvas = document.getElementById('soul-canvas');
                if (canvas && window.spawnResonanceBurst) {
                    window.spawnResonanceBurst();
                }

                resonateBtn.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    resonateBtn.style.transform = '';
                }, 150);
            } catch (err) {
                console.log('Audio playback info:', err);
            }
        });
    }

    // =========================================================================
    // 1. LUMINOUS SOUL CURSOR PARTICLE ENGINE (120FPS HARDWARE ACCELERATED)
    // =========================================================================
    const canvas = document.getElementById('soul-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: true });
        let particles = [];
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let mouseX = width / 2;
        let mouseY = height / 2;
        let prevMouseX = mouseX;
        let prevMouseY = mouseY;
        let isMoving = false;
        let idleTimer = null;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const speed = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
            prevMouseX = mouseX;
            prevMouseY = mouseY;

            // Spawn particles based on movement
            const spawnCount = Math.min(Math.floor(speed / 4) + 1, 4);
            const rgb = getThemeColorRGB();

            for (let i = 0; i < spawnCount; i++) {
                particles.push({
                    x: mouseX + (Math.random() - 0.5) * 12,
                    y: mouseY + (Math.random() - 0.5) * 12,
                    vx: (Math.random() - 0.5) * 1.4,
                    vy: -Math.random() * 1.2 - 0.4,
                    radius: Math.random() * 2.2 + 0.8,
                    life: 1.0,
                    decay: Math.random() * 0.025 + 0.015,
                    color: Math.random() > 0.35 ? rgb : '255, 163, 184' // Jade/Purple or Sakura Pink
                });
            }

            isMoving = true;
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isMoving = false;
            }, 300);
        }, { passive: true });

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.75})`;
                ctx.shadowColor = `rgba(${p.color}, 0.8)`;
                ctx.shadowBlur = 8;
                ctx.fill();
            }

            window.spawnResonanceBurst = function() {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const rgb = getThemeColorRGB();

                for (let i = 0; i < 36; i++) {
                    const angle = (i / 36) * Math.PI * 2;
                    const speed = Math.random() * 4 + 2;
                    particles.push({
                        x: centerX,
                        y: centerY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 1,
                        radius: Math.random() * 3 + 1.5,
                        life: 1.2,
                        decay: Math.random() * 0.015 + 0.01,
                        color: Math.random() > 0.4 ? rgb : '255, 163, 184'
                    });
                }
            };

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // =========================================================================
    // 2. HAUTE COUTURE MONOLITH STAGE SWITCHER
    // =========================================================================
    const slabs = document.querySelectorAll('.monolith-slab');
    slabs.forEach(slab => {
        slab.addEventListener('click', (e) => {
            // Ignore if clicked on the inspect button
            if (e.target.closest('.monolith-inspect-btn')) return;
            slabs.forEach(s => s.classList.remove('is-active'));
            slab.classList.add('is-active');
        });

        slab.addEventListener('mouseenter', () => {
            if (window.innerWidth > 900) {
                slabs.forEach(s => s.classList.remove('is-active'));
                slab.classList.add('is-active');
            }
        });
    });

    // =========================================================================
    // 3. TACTILE 3D PERSPECTIVE CARD TILT WITH HOLOGRAPHIC LIGHTING
    // =========================================================================
    const tiltCards = document.querySelectorAll('.art-perspective-card');

    tiltCards.forEach(card => {
        let targetRotateX = 0;
        let targetRotateY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;
        let isHovered = false;
        let animationFrameId = null;

        function updateCardTilt() {
            if (!isHovered) {
                targetRotateX = 0;
                targetRotateY = 0;
            }

            currentRotateX += (targetRotateX - currentRotateX) * 0.1;
            currentRotateY += (targetRotateY - currentRotateY) * 0.1;

            card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`;

            if (isHovered || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
                animationFrameId = requestAnimationFrame(updateCardTilt);
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                animationFrameId = null;
            }
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Compute percentage for holographic specular lighting
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${percentX}%`);
            card.style.setProperty('--mouse-y', `${percentY}%`);

            // Compute degrees (max ±6 deg)
            targetRotateX = ((centerY - y) / centerY) * 6;
            targetRotateY = ((x - centerX) / centerX) * 6;

            isHovered = true;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateCardTilt);
            }
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateCardTilt);
            }
        }, { passive: true });
    });

    // =========================================================================
    // 3. LIGHTBOX INSPECTOR
    // =========================================================================
    const modal = document.getElementById('art-inspector-modal');
    const modalImg = document.getElementById('inspector-img');
    const modalTitle = document.getElementById('inspector-title');
    const modalCaption = document.getElementById('inspector-caption');
    const modalTag = document.getElementById('inspector-tag');
    const closeBtn = document.getElementById('inspector-close');
    const backdrop = document.getElementById('inspector-backdrop');
    let lastActiveElement = null;

    function openInspector(trigger) {
        lastActiveElement = trigger;
        const src = trigger.getAttribute('data-art-src') || '';
        const title = trigger.getAttribute('data-art-title') || 'Exhibition Artwork';
        const caption = trigger.getAttribute('data-art-caption') || '';
        const tag = trigger.getAttribute('data-art-tag') || 'Artwork';

        modalImg.src = src;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalCaption.textContent = caption;
        modalTag.textContent = tag;

        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (closeBtn) closeBtn.focus();
    }

    function closeInspector() {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastActiveElement) lastActiveElement.focus();
    }

    document.querySelectorAll('.art-inspect-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openInspector(trigger);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeInspector);
    if (backdrop) backdrop.addEventListener('click', closeInspector);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeInspector();
        }
    });

    // =========================================================================
    // 4. HARDWARE-ACCELERATED SMOOTH SCROLL REVEAL
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }
});
