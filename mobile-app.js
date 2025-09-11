// Mobile app enhancements for Capacitor
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Capacitor plugins
    if (window.Capacitor) {
        initializeMobileApp();
    }
});

function initializeMobileApp() {
    // Configure status bar
    if (window.StatusBar) {
        window.StatusBar.setStyle({ style: 'dark' });
        window.StatusBar.setBackgroundColor({ color: '#1a1a1a' });
    }

    // Configure splash screen
    if (window.SplashScreen) {
        window.SplashScreen.hide();
    }

    // Add mobile-specific touch events
    addMobileTouchEvents();
    
    // Configure app for mobile
    configureMobileUI();
}

function addMobileTouchEvents() {
    // Add swipe gestures for navigation
    let startX, startY;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Horizontal swipe detection
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next section
                navigateToNextSection();
            } else {
                // Swipe right - previous section
                navigateToPreviousSection();
            }
        }
        
        startX = null;
        startY = null;
    });
}

function configureMobileUI() {
    // Add mobile-specific CSS
    const mobileCSS = `
        @media (max-width: 768px) {
            .header {
                padding: 0.5rem 1rem;
            }
            
            .nav {
                gap: 1rem;
            }
            
            .nav-link {
                padding: 0.25rem 0.5rem;
                font-size: 0.9rem;
            }
            
            .hero h2 {
                font-size: 2rem;
            }
            
            .feature-card, .category-card, .game-card {
                padding: 1.5rem;
            }
            
            .problem-workspace, .game-workspace, .calculator-workspace {
                margin: 1rem;
                border-radius: 12px;
            }
            
            .btn {
                padding: 0.75rem 1.5rem;
                font-size: 0.9rem;
            }
            
            .modal-content {
                margin: 1rem;
                max-height: calc(100vh - 2rem);
                overflow-y: auto;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileCSS;
    document.head.appendChild(style);
}

function navigateToNextSection() {
    const sections = ['home', 'problems', 'games', 'calculator', 'learn'];
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        const currentId = currentSection.id;
        const currentIndex = sections.indexOf(currentId);
        if (currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        }
    }
}

function navigateToPreviousSection() {
    const sections = ['home', 'problems', 'games', 'calculator', 'learn'];
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        const currentId = currentSection.id;
        const currentIndex = sections.indexOf(currentId);
        if (currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    }
}

// Export for use in main script
window.mobileApp = {
    initializeMobileApp,
    navigateToNextSection,
    navigateToPreviousSection
};
