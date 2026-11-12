

 
 // ==================================
 // 1. CONTACT FORM VALIDATION
 // ==================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        // Stop the form from refreshing
        event.preventDefault();

        // Get the visitor's information
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const status = document.getElementById("form-status");

        // Check if any fields are empty
        if (name === "" || email === "" ||
            subject === "" || message === "") {

            status.textContent = "Please fill in all fields.";
            status.className = "form-error";

        }

        // Check email format
        else if (!email.includes("@") ||
                 !email.includes(".") ||
                 email.includes(" ")) {

            status.textContent =
                "Please enter a valid email address.";

            status.className = "form-error";

        }

        // All information is valid
        else {

            status.textContent =
                "Thank you, " + name +
                "! Your enquiry has been received.";

            status.className = "form-success";

            // Clear the form
            contactForm.reset();

        }

    });

}


// ==================================
// 2. INTERACTIVE IMAGE GALLERY
// ==================================

const images = document.querySelectorAll(".gallery-image");
const viewer = document.getElementById("image-viewer");
const fullImage = document.getElementById("full-image");
const closeImage = document.getElementById("close-image");

// Remember the photograph that opened the gallery
let lastOpenedImage = null;

if (viewer && fullImage && closeImage) {

    // Open the selected image
    images.forEach(function(image) {

        function showImage() {

            // Remember which image was selected
            lastOpenedImage = image;

            // Set the full-size photograph
            fullImage.src = image.src;
            fullImage.alt = image.alt;

            // Display the gallery
            viewer.style.display = "flex";

            // Move keyboard focus to Close
            closeImage.focus();

        }

        // Open using a mouse click
        image.addEventListener("click", showImage);

        // Open using Enter or Space
        image.addEventListener("keydown", function(event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showImage();
            }

        });

    });

    // Close the image gallery
    function hideImage() {

        // Only run if the viewer is open
        if (viewer.style.display !== "flex") {
            return;
        }

        // Return focus to the original photograph
        if (lastOpenedImage) {
            lastOpenedImage.focus();
        }

        // Hide the gallery
        viewer.style.display = "none";

    }

    // Close button
    closeImage.addEventListener("click", hideImage);

    // Escape key
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            hideImage();
        }

    });

    // Keep focus inside the gallery while open
    viewer.addEventListener("keydown", function(event) {

        if (event.key === "Tab") {
            event.preventDefault();
            closeImage.focus();
        }

    });

}


// ==================================
// 3. DISTRICT IMAGE SLIDESHOW
// ==================================

// Store district images and descriptions
const slides = [
    {
        image: "images/bruneimuara.png",
        title: "Brunei-Muara",
        description: "Brunei-Muara is home to the capital, Bandar Seri Begawan, and is known for its cultural landmarks, historical sites and attractions."
    },
    {
        image: "images/tutong.png",
        title: "Tutong",
        description: "Tutong is known for its peaceful countryside, natural landscapes, traditional villages and rich cultural heritage."
    },
    {
        image: "images/belait.png",
        title: "Belait",
        description: "Belait is Brunei's largest district and is known for its oil and gas heritage, coastal towns and local communities."
    },
    {
        image: "images/temburong.png",
        title: "Temburong",
        description: "Temburong is famous for its tropical rainforests, beautiful natural scenery and ecotourism destinations."
    }
];

// Start with the first district
let currentSlide = 0;

// Find the slideshow elements
const slideImage = document.getElementById("slide-image");
const slideTitle = document.getElementById("slide-title");
const slideDescription = document.getElementById("slide-description");
const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");

// Only run if the slideshow exists
if (slideImage && slideTitle && slideDescription &&
    previousButton && nextButton) {

    // Display the current district
    function showSlide() {

        slideImage.src = slides[currentSlide].image;
        slideImage.alt = slides[currentSlide].title;

        slideTitle.textContent = slides[currentSlide].title;

        slideDescription.textContent =
            slides[currentSlide].description;

    }

    // Next button
    nextButton.addEventListener("click", function() {

        currentSlide++;

        // Return to first district after the last one
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide();

    });

    // Previous button
    previousButton.addEventListener("click", function() {

        currentSlide--;

        // Return to last district before the first one
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide();

    });

}
