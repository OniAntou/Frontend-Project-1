/**
 * URUHA RUSHIA - OFFICIAL EXHIBITION ARCHIVE
 * Museum Art Inspector Lightbox & Hardware-Accelerated Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. MUSEUM ART INSPECTOR LIGHTBOX
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
        const tag = trigger.getAttribute('data-art-tag') || 'EXHIBITION SPECIMEN';

        modalImg.src = src;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalCaption.textContent = caption;
        modalTag.textContent = tag;

        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus close button for accessibility
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
    // 2. HARDWARE-ACCELERATED SMOOTH SCROLL REVEAL
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
