// Mobile Navigation Toggle 
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('show');
        mobileMenu.classList.toggle('open');
    });
}



// Ensure the menu resets properly when resizing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > BREAKPOINT) {
            navList.classList.remove('show');
            navList.classList.add('desktop-visible');
            mobileMenu.classList.remove('open');
        } else {
            navList.classList.remove('desktop-visible');
        }
    }, 100); // Delay resize processing for better performance
});