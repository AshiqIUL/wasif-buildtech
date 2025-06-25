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






// Get filter buttons and gallery items
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Function to filter items based on category
function filterItems(filter) {
    galleryItems.forEach(item => {
        // Reset display to 'none' first
        item.classList.add('hidden');
    });

    // Apply the filter logic
    if (filter === 'all') {
        // Show all items
        galleryItems.forEach(item => item.classList.remove('hidden'));
    } else {
        // Show items matching the selected filter
        galleryItems.forEach(item => {
            if (item.classList.contains(filter)) {
                item.classList.remove('hidden');
            }
        });
    }
}

// Button click event listener
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        this.classList.add('active');

        // Get the filter from the clicked button
        const filter = this.getAttribute('data-filter');
        filterItems(filter); // Filter the items
    });
});

// Set default filter (All) on page load
filterItems('all');
