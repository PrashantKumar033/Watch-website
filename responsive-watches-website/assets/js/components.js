// Component loader for common header, footer, and cart
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../components/' : 'components/';
    
    await Promise.all([
        loadComponent('header-placeholder', basePath + 'header.html'),
        loadComponent('footer-placeholder', basePath + 'footer.html'),
        loadComponent('cart-placeholder', basePath + 'cart.html')
    ]);
    
    // Fix navigation links after loading
    fixNavigationLinks(isInPages);
    
    // Initialize functionality after components are loaded
    initializeComponents();
}

// Fix navigation links based on current page location
function fixNavigationLinks(isInPages) {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Fix links for pages in /pages/ directory
        if (isInPages) {
            if (href === 'featured.html') {
                link.setAttribute('href', 'featured.html');
            } else if (href === 'products.html') {
                link.setAttribute('href', 'products.html');
            } else if (href === 'new-arrivals.html') {
                link.setAttribute('href', 'new-arrivals.html');
            } else if (href === '../index.html#home') {
                link.setAttribute('href', '../index.html#home');
            }
        } else {
            // Fix links for main index page
            if (href === 'featured.html') {
                link.setAttribute('href', 'pages/featured.html');
            } else if (href === 'products.html') {
                link.setAttribute('href', 'pages/products.html');
            } else if (href === 'new-arrivals.html') {
                link.setAttribute('href', 'pages/new-arrivals.html');
            } else if (href === '../index.html#home') {
                link.setAttribute('href', '#home');
            }
        }
    });
    
    // Fix footer links
    const footerLinks = document.querySelectorAll('.footer__link');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (!isInPages && href.startsWith('../pages/')) {
            link.setAttribute('href', href.replace('../pages/', 'pages/'));
        } else if (!isInPages && href.startsWith('../index.html')) {
            link.setAttribute('href', href.replace('../index.html', 'index.html'));
        }
    });
}

// Initialize component functionality
function initializeComponents() {
    // Theme functionality
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';
    
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';
    
    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
    }
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
        
        // Immediately update header button colors
        updateHeaderButtonColors();
    });
    
    // Function to update header button colors
    function updateHeaderButtonColors() {
        const isDark = document.body.classList.contains(darkTheme);
        const headerButtons = document.querySelectorAll('.nav__user i, .nav__login i, .nav__shop i, .nav__toggle i, .change-theme');
        
        headerButtons.forEach(button => {
            if (isDark) {
                button.style.color = 'var(--title-color)';
            } else {
                button.style.color = 'var(--title-color)';
            }
        });
    }
    
    // Initial call to set correct colors
    updateHeaderButtonColors();
    
    // Navigation menu functionality
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    
    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show-menu')
        })
    }
    
    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show-menu')
        })
    }
    
    const navLink = document.querySelectorAll('.nav__link');
    const linkAction = () =>{
        const navMenu = document.getElementById('nav-menu')
        navMenu.classList.remove('show-menu')
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));
    
    // Cart functionality
    const cart = document.getElementById('cart');
    const cartShop = document.getElementById('cart-shop');
    const cartClose = document.getElementById('cart-close');
    
    if(cartShop){
        cartShop.addEventListener('click', async () =>{
            if (typeof updateCartUI === 'function') {
                await updateCartUI();
            }
            cart.classList.add('show-cart');
        })
    }
    
    if(cartClose){
        cartClose.addEventListener('click', () =>{
            cart.classList.remove('show-cart')
        })
    }
    
    // Scroll up functionality
    const scrollUp = () =>{
        const scrollUp = document.getElementById('scroll-up')
        this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                            : scrollUp.classList.remove('show-scroll')
    }
    window.addEventListener('scroll', scrollUp);
    
    // Header scroll effect
    const scrollHeader = () =>{
        const header = document.getElementById('header')
        this.scrollY >= 50 ? header.classList.add('scroll-header') 
                           : header.classList.remove('scroll-header')
    }
    window.addEventListener('scroll', scrollHeader);
    
    // Initialize user UI if function exists
    if (typeof updateUserUI === 'function') {
        updateUserUI();
    }
    
    // Add login functionality
    const loginBtn = document.getElementById('nav-login');
    if (loginBtn && typeof showAuthModal === 'function') {
        loginBtn.addEventListener('click', () => {
            showAuthModal();
        });
    }
    
    // User dropdown functionality
    const userSection = document.getElementById('nav-user');
    const userDropdown = userSection?.querySelector('.user__dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (userSection) {
        userSection.addEventListener('click', (e) => {
            e.stopPropagation();
            if (userDropdown) {
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
    
    if (logoutBtn && typeof logout === 'function') {
        logoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            logout();
            if (userDropdown) userDropdown.style.display = 'none';
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (userDropdown) userDropdown.style.display = 'none';
    });
    
    // Checkout functionality
    const checkoutBtn = document.getElementById('cart-checkout');
    if (checkoutBtn && typeof showCheckoutModal === 'function') {
        checkoutBtn.addEventListener('click', () => {
            if (typeof authToken !== 'undefined' && !authToken) {
                if (typeof showAuthModal === 'function') {
                    showAuthModal();
                }
                return;
            }
            showCheckoutModal();
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadAllComponents);