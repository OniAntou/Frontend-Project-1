/**
 * =============================================================================
 * URUHA RUSHIA — VISUAL ARCHIVE & MONOGRAPH
 * Official Interactive & Motion Engine (GSAP 3 & Hardware Accelerated DOM)
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 0. CINEMATIC HERO OPENING SEQUENCE (GSAP 3)
    // =========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.defaults({ ease: "power3.out" });

        // Split .hero-name into individual 3D masked character elements for 100% GPU acceleration
        const heroNameEl = document.querySelector('.hero-name');
        if (heroNameEl) {
            const rawText = heroNameEl.textContent.trim();
            const words = rawText.split(' ');
            heroNameEl.innerHTML = words.map(word => {
                const chars = word.split('').map(char => 
                    `<span class="hero-char-wrap"><span class="hero-char-inner">${char}</span></span>`
                ).join('');
                return `<span style="display: inline-block; white-space: nowrap;">${chars}</span>`;
            }).join('<span class="hero-char-wrap" style="width: 0.28em;">&nbsp;</span>');
        }

        const charElements = document.querySelectorAll('.hero-char-inner');

        // Set clean initial state to prevent any FOUC or jitter
        gsap.set('.hero-bg-img', {
            scale: 1.18,
            autoAlpha: 0,
            filter: 'brightness(0.18) blur(10px)'
        });
        gsap.set('.site-nav', {
            y: -25,
            autoAlpha: 0
        });
        gsap.set('.minimal-nav-dashes', {
            x: -25,
            autoAlpha: 0
        });
        gsap.set('.hero-tagline', {
            y: 20,
            autoAlpha: 0
        });
        if (charElements.length > 0) {
            gsap.set(charElements, {
                yPercent: 120,
                rotateX: -45,
                scale: 0.9,
                autoAlpha: 0
            });
        }
        gsap.set('.hero-kanji', {
            y: 25,
            autoAlpha: 0,
            scale: 0.92
        });
        gsap.set('.hero-quote', {
            y: 20,
            autoAlpha: 0,
            filter: 'blur(8px)'
        });
        gsap.set('.hero-intro', {
            y: 20,
            autoAlpha: 0
        });
        gsap.set('.hero-link', {
            y: 20,
            autoAlpha: 0
        });
        gsap.set('.hero-footer-bar', {
            y: 20,
            autoAlpha: 0
        });

        // Master Film-Grade Cinematic Timeline
        const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        heroTl
            // Phase 1: Camera Dolly In & Environmental Reveal
            .to('.hero-bg-img', {
                scale: 1.0,
                autoAlpha: 1,
                filter: 'brightness(0.55) blur(0px)',
                duration: 2.8,
                ease: "power2.out",
                clearProps: "filter"
            }, 0)

            // Phase 2: Navigation & HUD Elements Slide In
            .to('.site-nav', {
                y: 0,
                autoAlpha: 1,
                duration: 1.2
            }, 0.25)
            .to('.minimal-nav-dashes', {
                x: 0,
                autoAlpha: 1,
                duration: 1.0
            }, 0.4)

            // Phase 3: Tagline Float
            .to('.hero-tagline', {
                y: 0,
                autoAlpha: 1,
                duration: 1.0
            }, 0.45)

            // Phase 4: Film-Grade 3D Masked Character Stagger (Buttery smooth 120fps GPU)
            .to(charElements, {
                yPercent: 0,
                rotateX: 0,
                scale: 1.0,
                autoAlpha: 1,
                duration: 1.3,
                stagger: 0.04,
                ease: "power4.out"
            }, 0.55)

            // Phase 5: Kanji Bloom & Japanese Quote Optical De-blur
            .to('.hero-kanji', {
                y: 0,
                autoAlpha: 1,
                scale: 1.0,
                duration: 1.2,
                ease: "power2.out"
            }, 0.95)
            .to('.hero-quote', {
                y: 0,
                autoAlpha: 1,
                filter: 'blur(0px)',
                duration: 1.3,
                ease: "power2.out",
                clearProps: "filter"
            }, 1.1)

            // Phase 6: Narrative Prose & Action Link
            .to('.hero-intro', {
                y: 0,
                autoAlpha: 1,
                duration: 1.1
            }, 1.25)
            .to('.hero-link', {
                y: 0,
                autoAlpha: 1,
                duration: 1.0
            }, 1.4)

            // Phase 7: Clean Bottom Footer Bar & Ambient Camera Loop
            .to('.hero-footer-bar', {
                y: 0,
                autoAlpha: 1,
                duration: 1.1,
                onComplete: () => {
                    // Continuous subtle ambient camera breathing
                    gsap.to('.hero-bg-img', {
                        scale: 1.04,
                        duration: 18,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            }, 1.5);
    }

    // =========================================================================
    // 1. ATMOSPHERE THEME SWITCHER WITH SYNCHRONIZED WHITE BAR WIPE
    // =========================================================================
    const atmosphereBtn = document.getElementById('atmosphere-toggle');
    const atmosphereLabel = document.getElementById('atmosphere-label');
    const themeBeamRunner = document.getElementById('theme-beam-runner');
    let isThemeTransitioning = false;

    const savedTheme = localStorage.getItem('rushia-atmosphere') || 'emerald';
    if (savedTheme === 'gothic') {
        document.body.setAttribute('data-atmosphere', 'gothic');
        if (atmosphereLabel) atmosphereLabel.textContent = '☾ Gothic Eclipse';
    }

    function applyThemeSwitch(nextTheme) {
        const heroBg = document.querySelector('.hero-bg-img');
        if (heroBg) {
            heroBg.style.removeProperty('filter');
        }
        if (nextTheme === 'gothic') {
            document.body.setAttribute('data-atmosphere', 'gothic');
            localStorage.setItem('rushia-atmosphere', 'gothic');
            if (atmosphereLabel) atmosphereLabel.textContent = '☾ Gothic Eclipse';
        } else {
            document.body.removeAttribute('data-atmosphere');
            localStorage.setItem('rushia-atmosphere', 'emerald');
            if (atmosphereLabel) atmosphereLabel.textContent = '✦ Emerald Dawn';
        }
    }

    if (atmosphereBtn) {
        atmosphereBtn.addEventListener('click', () => {
            if (isThemeTransitioning) return;
            isThemeTransitioning = true;

            const isCurrentGothic = document.body.getAttribute('data-atmosphere') === 'gothic';
            const nextTheme = isCurrentGothic ? 'emerald' : 'gothic';

            // Trigger white bar sweep
            if (themeBeamRunner) {
                themeBeamRunner.classList.remove('is-sweeping');
                void themeBeamRunner.offsetWidth; // Force reflow
                themeBeamRunner.classList.add('is-sweeping');
            }

            if (document.startViewTransition) {
                const transition = document.startViewTransition(() => {
                    applyThemeSwitch(nextTheme);
                });

                transition.finished.finally(() => {
                    if (themeBeamRunner) themeBeamRunner.classList.remove('is-sweeping');
                    isThemeTransitioning = false;
                });
            } else {
                // Fallback for browsers without View Transitions API
                setTimeout(() => applyThemeSwitch(nextTheme), 300);
                setTimeout(() => {
                    if (themeBeamRunner) themeBeamRunner.classList.remove('is-sweeping');
                    isThemeTransitioning = false;
                }, 600);
            }
        });
    }

    // =========================================================================
    // 2. HAUTE COUTURE MONOLITH STAGE SWITCHER
    // =========================================================================
    const slabs = document.querySelectorAll('.monolith-slab');
    slabs.forEach(slab => {
        slab.addEventListener('click', (e) => {
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

            targetRotateX = ((centerY - y) / centerY) * 5;
            targetRotateY = ((x - centerX) / centerX) * 5;

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
    // 4. LIGHTBOX INSPECTOR
    // =========================================================================
    const modal = document.getElementById('art-inspector-modal');
    const modalImg = document.getElementById('inspector-img');
    const modalTitle = document.getElementById('inspector-title');
    const modalCaption = document.getElementById('inspector-caption');
    const closeBtn = document.getElementById('inspector-close');
    const backdrop = document.getElementById('inspector-backdrop');
    let lastActiveElement = null;

    function openInspector(trigger) {
        lastActiveElement = trigger;
        const src = trigger.getAttribute('data-art-src') || '';
        const title = trigger.getAttribute('data-art-title') || 'Exhibition Artwork';
        const caption = trigger.getAttribute('data-art-caption') || '';

        modalImg.src = src;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalCaption.textContent = caption;

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
    // 5. HARDWARE-ACCELERATED SMOOTH SCROLL REVEAL (IntersectionObserver)
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');

                    // If Chapter 01 Memory is revealed, animate legend items stagger
                    if (entry.target.classList.contains('memory-editorial-col') && typeof gsap !== 'undefined') {
                        const legendItems = entry.target.querySelectorAll('.legend-item');
                        if (legendItems.length > 0) {
                            gsap.fromTo(legendItems,
                                { y: 20, autoAlpha: 0, scale: 0.95 },
                                { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.5)" }
                            );
                        }
                    }

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

    // =========================================================================
    // 6. CINEMATIC PARALLAX & LIVE AUDIO WAVEFORM VISUALIZER (GSAP)
    // =========================================================================
    if (typeof gsap !== 'undefined') {
        // 6a. Floating Calligraphy Seal Smooth Parallax (降臨 2019)
        const floatingSeal = document.querySelector('.memory-floating-seal');
        if (floatingSeal) {
            window.addEventListener('scroll', () => {
                const memorySec = document.getElementById('memory');
                if (memorySec) {
                    const rect = memorySec.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const sealY = (progress - 0.5) * -35;
                        floatingSeal.style.transform = `translateY(${sealY}px) rotate(${(progress - 0.5) * -4}deg)`;
                    }
                }
            }, { passive: true });
        }

        // 6b. Live 28-Bar Harmonic Audio Waveform Equalizer (Iris Anthem)
        const waveBars = document.querySelectorAll('.audio-waveform .wave-bar');
        if (waveBars.length > 0) {
            waveBars.forEach((bar, index) => {
                const baseScale = 0.2 + (Math.sin(index * 0.4) * 0.15 + 0.15);
                const targetScale = 0.6 + (Math.cos(index * 0.5) * 0.2 + 0.2);
                gsap.to(bar, {
                    scaleY: targetScale,
                    duration: 0.35 + (index % 5) * 0.08,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.04
                });
            });
        }
    }

    // =========================================================================
    // 7. ULTRA-MINIMAL SECTION DASHES & TOP HAIRLINE PROGRESS
    // =========================================================================
    const navDashes = document.querySelectorAll('.nav-dash');
    const topHairline = document.getElementById('top-scroll-hairline');
    const sections = document.querySelectorAll('header.hero-stage, section');

    function updateMinimalNav() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const rawPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        const clampedPercent = Math.min(Math.max(rawPercent, 0), 100);

        if (topHairline) {
            topHairline.style.width = `${clampedPercent}%`;
        }

        let currentSectionId = 'prologue';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
                currentSectionId = section.id;
            }
        });

        navDashes.forEach(dash => {
            if (dash.getAttribute('data-section') === currentSectionId) {
                dash.classList.add('is-active');
            } else {
                dash.classList.remove('is-active');
            }
        });
    }

    window.addEventListener('scroll', updateMinimalNav, { passive: true });
    updateMinimalNav();

    // =========================================================================
    // 8. NECROMANCY TEXT SCRAMBLE / DECRYPTION ENGINE
    // =========================================================================
    const NECROMANCY_GLYPHS = '✦✧‡§☥♰るしあ羽潤蝶魂01XVI∆∇⌘';

    function runTextScramble(element, duration = 0.55) {
        if (!element || element.dataset.isScrambling === 'true') return;
        const originalText = element.dataset.originalText || element.textContent.trim();
        element.dataset.originalText = originalText;
        element.dataset.isScrambling = 'true';

        const length = originalText.length;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const settledCount = Math.floor(progress * length);

            let result = '';
            for (let i = 0; i < length; i++) {
                if (originalText[i] === ' ' || originalText[i] === '\n') {
                    result += originalText[i];
                } else if (i < settledCount) {
                    result += originalText[i];
                } else {
                    const randomGlyph = NECROMANCY_GLYPHS[Math.floor(Math.random() * NECROMANCY_GLYPHS.length)];
                    result += randomGlyph;
                }
            }

            element.textContent = result;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = originalText;
                element.dataset.isScrambling = 'false';
            }
        }

        requestAnimationFrame(step);
    }

    const scrambleTargets = document.querySelectorAll(
        '.brand-jp, .hero-kanji, .seal-kanji, .monolith-collapsed-kanji, .legend-num, .section-kicker, .monolith-epoch-badge, .waveform-bpm, [data-scramble]'
    );

    scrambleTargets.forEach(target => {
        target.classList.add('scramble-hover-trigger');
        target.addEventListener('mouseenter', () => {
            runTextScramble(target);
        });
    });
});
