// Menu Items Data
const menuItems = {
    coffee: [
        { name: 'Espresso', price: '$3.50', description: 'Rich and bold single shot espresso' },
        { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk and foam' },
        { name: 'Latte', price: '$4.75', description: 'Espresso with steamed milk' },
        { name: 'Americano', price: '$3.75', description: 'Espresso with hot water' },
        { name: 'Mocha', price: '$5.00', description: 'Espresso with chocolate and steamed milk' },
        { name: 'Flat White', price: '$4.25', description: 'Double espresso with steamed milk' }
    ],
    pastries: [
        { name: 'Croissant', price: '$3.25', description: 'Buttery, flaky pastry' },
        { name: 'Chocolate Muffin', price: '$3.50', description: 'Rich chocolate muffin' },
        { name: 'Cinnamon Roll', price: '$4.00', description: 'Sweet cinnamon pastry with icing' },
        { name: 'Almond Danish', price: '$4.25', description: 'Flaky pastry with almond filling' },
        { name: 'Blueberry Scone', price: '$3.75', description: 'Classic scone with fresh blueberries' }
    ],
    specialty: [
        { name: 'Caramel Macchiato', price: '$5.25', description: 'Espresso with caramel and steamed milk' },
        { name: 'Pumpkin Spice Latte', price: '$5.50', description: 'Seasonal favorite with pumpkin spice' },
        { name: 'Hazelnut Latte', price: '$5.00', description: 'Espresso with hazelnut syrup and steamed milk' },
        { name: 'Iced Caramel Latte', price: '$5.25', description: 'Espresso with caramel and cold milk over ice' }
    ],
    food: [
        { name: 'Avocado Toast', price: '$8.50', description: 'Sourdough toast with avocado, cherry tomatoes, and feta' },
        { name: 'Breakfast Sandwich', price: '$7.50', description: 'Egg, cheese, and bacon on a croissant' },
        { name: 'Quinoa Bowl', price: '$9.50', description: 'Quinoa with roasted vegetables and tahini dressing' },
        { name: 'Caesar Salad', price: '$8.00', description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing' }
    ]
};

// Testimonials Data
const testimonials = [
    {
        rating: 5,
        text: "The best coffee shop in town! Their specialty drinks are amazing and the atmosphere is perfect for both work and relaxation.",
        name: "Sarah Johnson",
        role: "Regular Customer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        rating: 5,
        text: "I love their pastries and the coffee is always perfect. The staff is friendly and the place has a great vibe.",
        name: "Michael Chen",
        role: "Coffee Enthusiast",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        rating: 5,
        text: "The best place to work remotely. Great coffee, fast WiFi, and comfortable seating. Highly recommended!",
        name: "Emily Rodriguez",
        role: "Digital Nomad",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
];

// DOM Elements
const menuGrid = document.querySelector('.menu-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const reservationForm = document.getElementById('reservationForm');
const testimonialsSlider = document.querySelector('.testimonials-slider');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Menu Category Filtering
function displayMenuItems(category) {
    menuGrid.innerHTML = '';
    menuItems[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <p class="description">${item.description}</p>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Initialize menu with coffee items
displayMenuItems('coffee');

// Category Button Click Handlers
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayMenuItems(button.dataset.category);
    });
});

// Testimonials Slider
let currentTestimonial = 0;

function displayTestimonial(index) {
    const testimonial = testimonials[index];
    testimonialsSlider.innerHTML = `
        <div class="testimonial">
            <div class="rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}</div>
            <p>${testimonial.text}</p>
            <div class="customer">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <div class="customer-info">
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        </div>
    `;
}

// Initialize testimonials
displayTestimonial(currentTestimonial);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    displayTestimonial(currentTestimonial);
}, 5000);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Submission Handlers
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Contact form submitted:', formObject);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Reservation form submitted:', formObject);
    
    // Show success message
    showNotification('Thank you for your reservation! We will confirm your booking shortly.');
    reservationForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to a server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    showNotification('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add animation classes to elements
document.querySelectorAll('.section-header, .about-content, .menu-item, .gallery-item, .testimonial').forEach(element => {
    element.classList.add('animate-on-scroll');
}); 