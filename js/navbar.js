class Navbar {
    constructor( ) {
        this.navbarPath = "../components/navbar.html";
    }

    async load() {
        try {
            const response = await fetch (this.navbarPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const navbarHTML = await response.text();
           
            const placeholder = document.querySelector('.navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = navbarHTML;
            } else {
                  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
            }
            this.highlightCurrentPage();
            this.initScrollEffects();
        } catch (error) {
            console.error("Error loading navbar:", error);
        }
    }

    highlightCurrentPage(){
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage.split('/').pop()) {
                link.classList.add('active');
            }
        });
    }

    initScrollEffects() {
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class for background effect
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

}