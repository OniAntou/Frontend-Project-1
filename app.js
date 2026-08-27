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
    // 1. HAUTE COUTURE MONOLITH STAGE SWITCHER
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
    // 2. TACTILE 3D PERSPECTIVE CARD TILT WITH HOLOGRAPHIC LIGHTING
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

            // Compute degrees (max ±5 deg)
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
