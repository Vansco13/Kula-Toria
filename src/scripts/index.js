// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', () => {
		navMenu.classList.remove('active');
		hamburger.classList.remove('active');
	});
});

// Smooth scrolling function
function scrollToSection(sectionId) {
	const element = document.getElementById(sectionId);
	if (element) {
		const headerOffset = 80;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const targetId = link.getAttribute('href').substring(1);
		scrollToSection(targetId);
	});
});

// Menu category switching
let currentCategory = 'lunch';

function showCategory(category) {
	// Hide current category
	const currentItems = document.getElementById(currentCategory);
	if (currentItems) {
		currentItems.classList.add('hidden');
	}

	// Show new category
	const newItems = document.getElementById(category);
	if (newItems) {
		newItems.classList.remove('hidden');
	}

	// Update active category button
	document.querySelectorAll('.menu-category').forEach(cat => {
		cat.classList.remove('active');
	});

	event.target.classList.add('active');
	currentCategory = category;
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get form data
	const formData = new FormData(contactForm);
	const name = contactForm.querySelector('input[type="text"]').value;
	const email = contactForm.querySelector('input[type="email"]').value;
	const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
	const message = contactForm.querySelector('textarea').value;

	// Simple validation
	if (!name || !email || !subject || !message) {
		alert('Please fill in all fields.');
		return;
	}

	if (!isValidEmail(email)) {
		alert('Please enter a valid email address.');
		return;
	}

	// Simulate form submission
	alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
	contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
	const navbar = document.querySelector('.navbar');
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(255, 255, 255, 0.98)';
		navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
	} else {
		navbar.style.background = 'rgba(255, 255, 255, 0.95)';
		navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
	}
});

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('fade-in');
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
	const animateElements = document.querySelectorAll('.service-card, .event-item, .menu-item, .stat');
	animateElements.forEach(el => observer.observe(el));
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');

	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 100;
		const sectionHeight = section.clientHeight;

		if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
			current = section.getAttribute('id');
		}
	});

	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
});

// Menu item hover effects
document.addEventListener('DOMContentLoaded', () => {
	const menuItems = document.querySelectorAll('.menu-item');

	menuItems.forEach(item => {
		item.addEventListener('mouseenter', () => {
			item.style.transform = 'translateX(10px)';
			item.style.boxShadow = '0 5px 20px rgba(139, 69, 19, 0.15)';
		});

		item.addEventListener('mouseleave', () => {
			item.style.transform = 'translateX(0)';
			item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
		});
	});
});

// Service times functionality (example of dynamic content)
function getCurrentServiceStatus() {
	const now = new Date();
	const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const currentTime = hours + minutes / 60;

	let status = '';

	if (day === 0) { // Sunday
		if (currentTime >= 10 && currentTime < 11.5) {
			status = 'Service is currently in progress! Join us now.';
		} else if (currentTime < 10) {
			status = 'Sunday service starts at 10:00 AM';
		} else {
			status = 'Next service: Next Sunday at 10:00 AM';
		}
	} else if (day === 3) { // Wednesday
		if (currentTime >= 19 && currentTime < 20) {
			status = 'Evening prayer is currently in progress!';
		} else if (currentTime < 19) {
			status = 'Evening prayer starts at 7:00 PM';
		} else {
			status = 'Next prayer service: Next Wednesday at 7:00 PM';
		}
	} else {
		if (day < 3) {
			status = 'Next service: Wednesday evening prayer at 7:00 PM';
		} else {
			status = 'Next service: Sunday morning service at 10:00 AM';
		}
	}

	return status;
}

// Display current service status
document.addEventListener('DOMContentLoaded', () => {
	const servicesSection = document.getElementById('services');
	if (servicesSection) {
		const statusDiv = document.createElement('div');
		statusDiv.className = 'service-status';
		statusDiv.style.cssText = `
            text-align: center;
            background: linear-gradient(135deg, #8B4513, #D2691E);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin: 2rem auto;
            max-width: 600px;
            font-weight: bold;
        `;
		statusDiv.textContent = getCurrentServiceStatus();

		const container = servicesSection.querySelector('.container');
		container.insertBefore(statusDiv, container.querySelector('.services-grid'));
	}
});

// Update service status every minute
setInterval(() => {
	const statusDiv = document.querySelector('.service-status');
	if (statusDiv) {
		statusDiv.textContent = getCurrentServiceStatus();
	}
}, 60000);

// Interactive elements feedback
document.addEventListener('DOMContentLoaded', () => {
	// Add click feedback to buttons
	document.querySelectorAll('.btn').forEach(button => {
		button.addEventListener('click', function() {
			this.style.transform = 'scale(0.95)';
			setTimeout(() => {
				this.style.transform = '';
			}, 150);
		});
	});

	// Add focus styles for accessibility
	document.querySelectorAll('input, textarea, button').forEach(element => {
		element.addEventListener('focus', function() {
			this.style.outline = '2px solid #8B4513';
			this.style.outlineOffset = '2px';
		});

		element.addEventListener('blur', function() {
			this.style.outline = '';
			this.style.outlineOffset = '';
		});
	});
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
	// ESC to close mobile menu
	if (e.key === 'Escape' && navMenu.classList.contains('active')) {
		navMenu.classList.remove('active');
		hamburger.classList.remove('active');
	}

	// Enter to submit form
	if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') {
		e.preventDefault();
		contactForm.dispatchEvent(new Event('submit'));
	}
});

// Console welcome message
console.log(`
🏛️ Welcome to Kula-Toria! 
Where faith nourishes the soul and food nourishes the body.

This website demonstrates modern web development practices including:
- Responsive design
- Interactive JavaScript
- Smooth animations
- Accessibility features
- Mobile-first approach

Perfect for learning Git workflows and collaboration!
`);

// Performance monitoring (simple version)
window.addEventListener('load', () => {
	const loadTime = performance.now();
	console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

	// Log to help with Git workflow demonstration
	console.log('Ready for Git workflow demonstration!');
});
