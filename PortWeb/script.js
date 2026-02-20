const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const internalLinks = document.querySelectorAll('[data-target]');

// --- 0. STRICT INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    navItems.forEach(nav => nav.classList.remove('active-nav'));
    views.forEach(v => {
        v.classList.remove('active');
        gsap.set(v, { opacity: 0 }); 
    });

    const defaultNav = document.querySelector('[data-target="welcome-view"]');
    const defaultView = document.getElementById('welcome-view');
    
    if (defaultNav && defaultView) {
        defaultNav.classList.add('active-nav');
        defaultView.classList.add('active');
        gsap.set(defaultView, { opacity: 1 });

        gsap.from(".nav-item", { x: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
        gsap.from(defaultView.querySelectorAll('.fade-in'), { y: 30, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 });
    }
});

// --- 1. SPA Navigation & View Switching ---
function switchView(targetId) {
    const currentView = document.querySelector('.view.active');
    const targetView = document.getElementById(targetId);

    if (!targetView || currentView === targetView) return;

    navItems.forEach(nav => {
        if(nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active-nav');
        } else {
            nav.classList.remove('active-nav');
        }
    });

    gsap.to(currentView, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            currentView.classList.remove('active');
            targetView.classList.add('active');
            
            gsap.set(targetView, { opacity: 0, y: 30 });
            document.querySelector('.dashboard').scrollTop = 0;
            
            gsap.to(targetView, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });

            const elementsToAnimate = targetView.querySelectorAll('.fade-in');
            if(elementsToAnimate.length > 0) {
                gsap.fromTo(elementsToAnimate, 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
                );
            }
        }
    });
}

internalLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-target');
        switchView(targetId);
    });
});

// --- 2. Magnetic Hover Physics ---
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', function(e) {
        const position = elem.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        gsap.to(elem, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
    });

    elem.addEventListener('mouseleave', function() {
        gsap.to(elem, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    });
});