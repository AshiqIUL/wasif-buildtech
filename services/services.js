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



document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".service");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on ID
                if (entry.target.id.includes("service1") || entry.target.id.includes("service4") || entry.target.id.includes("service7")) {
                    entry.target.classList.add("slide-left");
                } else if (entry.target.id.includes("service2") || entry.target.id.includes("service5")) {
                    entry.target.classList.add("slide-bottom");
                } else {
                    entry.target.classList.add("slide-right");
                }
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    elements.forEach(element => observer.observe(element));
});
