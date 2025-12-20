// Phone number for WhatsApp and calls
const phoneNumber = '0503250732';

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Slideshow Functionality
const slideshows = ['banners-slideshow', 'stickers-slideshow', 'gifts-slideshow', 'cards-slideshow'];

// Initialize all slideshows
slideshows.forEach(slideshowId => {
    initSlideshow(slideshowId);
});

function initSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    const dotsContainer = document.getElementById(slideshowId.replace('-slideshow', '-dots'));
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(slideshowId, index));
        dotsContainer.appendChild(dot);
    });

    // Auto advance slides
    setInterval(() => {
        changeSlide(slideshowId, 1);
    }, 4000);
}

function showSlide(slideshowId, index) {
    const slideshow = document.getElementById(slideshowId);
    const slides = slideshow.querySelectorAll('.slide');
    const dots = document.getElementById(slideshowId.replace('-slideshow', '-dots')).querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrapping
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Store current index
    slideshow.dataset.currentSlide = index;
}

function changeSlide(slideshowId, direction) {
    const slideshow = document.getElementById(slideshowId);
    const currentIndex = parseInt(slideshow.dataset.currentSlide || '0');
    const newIndex = currentIndex + direction;
    const slides = slideshow.querySelectorAll('.slide');
    
    let finalIndex = newIndex;
    if (newIndex >= slides.length) finalIndex = 0;
    if (newIndex < 0) finalIndex = slides.length - 1;
    
    showSlide(slideshowId, finalIndex);
}

// WhatsApp Integration
function openWhatsApp(service = '') {
    let message = 'Hello! I would like to inquire about your services.';
    
    if (service) {
        message = `Hello! I would like to order ${service}. Please provide me with more details.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Phone Call Integration
function makeCall() {
    window.location.href = `tel:${phoneNumber}`;
}

// Scroll Animation for Service Blocks
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service blocks
document.querySelectorAll('.service-block').forEach(block => {
    observer.observe(block);
});

// Gallery Item Hover Effect Enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature Cards Animation on Scroll
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            featureObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    featureObserver.observe(card);
});

// Gallery Items Animation on Scroll
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            galleryObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    galleryObserver.observe(item);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    shapes.forEach((shape, index) => {
        if (scrolled < window.innerHeight) {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
        }
    });
});

// Button Click Animation
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Preload images for smoother transitions
const preloadImages = () => {
    const imageUrls = [
        // Add any actual image URLs here when available
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

preloadImages();

// Add cursor follow effect (optional enhancement)
let cursorDot = null;
let cursorOutline = null;

if (window.innerWidth > 768) {
    cursorDot = document.createElement('div');
    cursorOutline = document.createElement('div');
    
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.15s ease;
    `;
    
    cursorOutline.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.25s ease;
    `;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    const animateOutline = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        
        requestAnimationFrame(animateOutline);
    };
    
    animateOutline();
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .gallery-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(1.5)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

console.log('Color & Ideas For Advertising - Website Loaded Successfully! 🎨');
console.log('Contact: ' + phoneNumber);