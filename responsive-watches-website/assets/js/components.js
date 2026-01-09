// Component loader
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
    
    // Setup navigation after loading
    setupNavigation(isInPages);
    initializeComponents();
}

// Setup navigation links
function setupNavigation(isInPages) {
    // Header links
    const logoLink = document.getElementById('logo-link');
    const homeLink = document.getElementById('home-link');
    const featuredLink = document.getElementById('featured-link');
    const productsLink = document.getElementById('products-link');
    const newLink = document.getElementById('new-link');
    
    // Footer links
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const warrantyLink = document.getElementById('warranty-link');

    const supportLink = document.getElementById('support-link');
    const customerLink = document.getElementById('customer-link');
    const aboutLink = document.getElementById('about-link');
    const copyrightLink = document.getElementById('copyright-link');
    
    if (isInPages) {
        // From pages folder
        if (logoLink) logoLink.href = '../index.html';
        if (homeLink) homeLink.href = '../index.html';
        if (featuredLink) featuredLink.href = 'featured.html';
        if (productsLink) productsLink.href = 'products.html';
        if (newLink) newLink.href = 'new-arrivals.html';
        
        // Footer links from pages
        if (termsLink) termsLink.href = 'terms-conditions.html';
        if (privacyLink) privacyLink.href = 'privacy-policy.html';
        if (warrantyLink) warrantyLink.href = 'warranty-policy.html';

        if (supportLink) supportLink.href = 'support-center.html';
        if (customerLink) customerLink.href = 'customer-support.html';
        if (aboutLink) aboutLink.href = 'about-us.html';
        if (copyrightLink) copyrightLink.href = 'copyright.html';
    } else {
        // From root
        if (logoLink) logoLink.href = 'index.html';
        if (homeLink) homeLink.href = '#home';
        if (featuredLink) featuredLink.href = 'pages/featured.html';
        if (productsLink) productsLink.href = 'pages/products.html';
        if (newLink) newLink.href = 'pages/new-arrivals.html';
        
        // Footer links from root
        if (termsLink) termsLink.href = 'pages/terms-conditions.html';
        if (privacyLink) privacyLink.href = 'pages/privacy-policy.html';
        if (warrantyLink) warrantyLink.href = 'pages/warranty-policy.html';

        if (supportLink) supportLink.href = 'pages/support-center.html';
        if (customerLink) customerLink.href = 'pages/customer-support.html';
        if (aboutLink) aboutLink.href = 'pages/about-us.html';
        if (copyrightLink) copyrightLink.href = 'pages/copyright.html';
    }
}

// Initialize components
function initializeComponents() {
    // Theme
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';
    
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    
    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
    }
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
        localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun');
    });
    
    // Navigation menu
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });
    
    // Cart
    const cart = document.getElementById('cart');
    const cartShop = document.getElementById('cart-shop');
    const cartClose = document.getElementById('cart-close');
    
    if(cartShop) {
        cartShop.addEventListener('click', async () => {
            if (typeof updateCartUI === 'function') {
                await updateCartUI();
            }
            cart.classList.add('show-cart');
        });
    }
    
    if(cartClose) {
        cartClose.addEventListener('click', () => {
            cart.classList.remove('show-cart');
        });
    }
    
    // Header scroll
    const scrollHeader = () => {
        const header = document.getElementById('header');
        this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
    };
    window.addEventListener('scroll', scrollHeader);
    
    // Initialize user UI
    if (typeof updateUserUI === 'function') {
        setTimeout(updateUserUI, 100);
    }
    
    // Login
    const loginBtn = document.getElementById('nav-login');
    if (loginBtn && typeof showAuthModal === 'function') {
        loginBtn.addEventListener('click', () => {
            showAuthModal();
        });
    }
    
    // User dropdown
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
    
    document.addEventListener('click', () => {
        if (userDropdown) userDropdown.style.display = 'none';
    });
    
    // Checkout
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

// Load on DOM ready
document.addEventListener('DOMContentLoaded', loadAllComponents);