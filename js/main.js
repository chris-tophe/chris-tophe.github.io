(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (backToTop) {
        window.addEventListener('scroll', toggleBackToTop);
        backToTop.addEventListener('click', scrollToTop);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    loadTheme();

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.body.classList.add('light-theme');
        }
    }

    function toggleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }
    }

    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            nav.style.background = 'var(--bg-secondary)';
        }
        lastScroll = currentScroll;
    });
})();
