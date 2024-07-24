function headerTransitionColors() {
    const headerEl = document.querySelector("#menu-header");
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

    let observer;
    let currentThreshold = 0.1;

    const createObserver = (threshold) => {
        if (observer) observer.disconnect(); // Desconectar el antiguo observador si existe

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const { isIntersecting, target } = entry;
                const color = target.getAttribute("data-header-theme");

                if (isIntersecting) {
                    headerEl.style.color = color;
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: threshold,
        });

        const sectionElements = document.querySelectorAll("[data-header-theme]");
        sectionElements.forEach((section) => observer.observe(section));
    };

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo
            if (currentThreshold !== 0.96) {
                currentThreshold = 0.96;
                createObserver(currentThreshold);
            }
        } else {
            // Scroll hacia arriba
            if (currentThreshold !== 0.1) {
                currentThreshold = 0.1;
                createObserver(currentThreshold);
            }
        }
        lastScrollTop = scrollTop;
    });

    // Crear el observador inicial con el umbral bajo
    createObserver(currentThreshold);
}

window.addEventListener("DOMContentLoaded", headerTransitionColors);
