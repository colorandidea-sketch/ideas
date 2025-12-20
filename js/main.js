/* ===============================
   CONTACT CONFIG (SAUDI ARABIA)
================================ */

// WhatsApp requires digits only (NO +)
const whatsappNumber = '966503250732';

// Phone calls require +
const callNumber = '+966503250732';


/* ===============================
   MOBILE NAVIGATION
================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}


/* ===============================
   SMOOTH SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});


/* ===============================
   SLIDESHOW
================================ */
const slideshows = [
    'banners-slideshow',
    'stickers-slideshow',
    'gifts-slideshow',
    'cards-slideshow'
];

slideshows.forEach(initSlideshow);

function initSlideshow(id) {
    const slideshow = document.getElementById(id);
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    const dotsBox = document.getElementById(id.replace('-slideshow', '-dots'));
    if (!dotsBox) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => showSlide(id, i);
        dotsBox.appendChild(dot);
    });

    setInterval(() => changeSlide(id, 1), 4000);
}

function showSlide(id, index) {
    const slideshow = document.getElementById(id);
    const slides = slideshow.querySelectorAll('.slide');
    const dots = document.getElementById(id.replace('-slideshow', '-dots')).children;

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    [...slides].forEach(s => s.classList.remove('active'));
    [...dots].forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    slideshow.dataset.currentSlide = index;
}

function changeSlide(id, dir) {
    const slideshow = document.getElementById(id);
    const current = parseInt(slideshow.dataset.currentSlide || 0);
    showSlide(id, current + dir);
}


/* ===============================
   WHATSAPP & CALL (FIXED)
================================ */
function openWhatsApp(service = '') {
    let message = 'Hello! I would like to inquire about your services.';
    if (service) {
        message = `Hello! I would like to order ${service}. Please provide more details.`;
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function makeCall() {
    window.location.href = `tel:${callNumber}`;
}


/* ===============================
   RIPPLE BUTTON EFFECT
================================ */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
            width:${size}px;
            height:${size}px;
            left:${e.clientX - rect.left - size / 2}px;
            top:${e.clientY - rect.top - size / 2}px;
        `;
        ripple.className = 'ripple';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});


/* ===============================
   DYNAMIC STYLES
================================ */
const style = document.createElement('style');
style.textContent = `
.btn{position:relative;overflow:hidden}
.ripple{
 position:absolute;
 border-radius:50%;
 background:rgba(255,255,255,.5);
 transform:scale(0);
 animation:ripple .6s ease-out
}
@keyframes ripple{to{transform:scale(4);opacity:0}}
`;
document.head.appendChild(style);


/* ===============================
   LOAD ANIMATION
================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity .5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


console.log('Color & Ideas For Advertising - Website Loaded 🎨');
console.log('WhatsApp:', whatsappNumber);
console.log('Call:', callNumber);
