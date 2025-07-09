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




// Email Validation Function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Phone Number Validation Function
function validatePhone(phone) {
    const regex = /^\d{10,15}$/; // Accepts 10 to 15 digit numbers
    return regex.test(phone);
}

// Form Submit Handler
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');

    // Basic Field Validation
    if (!name || !email || !phone || !message) {
        alert("Please fill out all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number (10-15 digits).");
        return;
    }

    // Disable the button while processing
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        const response = await fetch("https://wasif-backend.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName: name, email, phone, message }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Message sent successfully!");
            document.getElementById("contact-form").reset();
        } else {
            alert(result.message || "Failed to send message. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = "SUBMIT";
});

