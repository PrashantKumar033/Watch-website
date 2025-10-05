// Additional theme fix for header buttons
document.addEventListener('DOMContentLoaded', () => {
    // Force update header button colors on page load
    setTimeout(() => {
        const isDark = document.body.classList.contains('dark-theme');
        const headerButtons = document.querySelectorAll('.nav__user i, .nav__login i, .nav__shop i, .nav__toggle i, .change-theme');
        
        headerButtons.forEach(button => {
            if (isDark) {
                button.style.setProperty('color', 'var(--title-color)', 'important');
            }
        });
    }, 100);
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDark = document.body.classList.contains('dark-theme');
                const headerButtons = document.querySelectorAll('.nav__user i, .nav__login i, .nav__shop i, .nav__toggle i, .change-theme');
                
                headerButtons.forEach(button => {
                    button.style.setProperty('color', 'var(--title-color)', 'important');
                });
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
});