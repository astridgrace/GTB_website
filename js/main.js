// Affiche l'année courante
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if(navToggle && mainNav){
	navToggle.addEventListener('click', function(){
		const expanded = this.getAttribute('aria-expanded') === 'true';
		this.setAttribute('aria-expanded', String(!expanded));
		mainNav.classList.toggle('open');
	});
}

// Smooth scroll for internal links with hashes
document.addEventListener('click', function(e){
	const a = e.target.closest('a');
	if(!a) return;
	const href = a.getAttribute('href') || '';
	if(href.startsWith('#')){
		e.preventDefault();
		const target = document.querySelector(href);
		if(target) target.scrollIntoView({behavior:'smooth'});
	}
});

// Validation simple du formulaire de contact
function showError(id, message){
	const el = document.getElementById(id);
	if(el) el.textContent = message || '';
}

function validateEmail(email){
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const contactForm = document.getElementById('contact-form');
if(contactForm){
	contactForm.addEventListener('submit', function(e){
		e.preventDefault();
		let valid = true;
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const phone = document.getElementById('phone');
		const message = document.getElementById('message');
		const consent = document.getElementById('consent');

		// réinitialiser erreurs
		showError('error-name',''); showError('error-email',''); showError('error-phone',''); showError('error-message',''); showError('error-consent','');

		if(!name.value.trim()){ showError('error-name','Veuillez indiquer votre nom.'); valid = false; }
		if(!email.value.trim() || !validateEmail(email.value.trim())){ showError('error-email','Adresse email invalide.'); valid = false; }
		if(message && !message.value.trim()){ showError('error-message','Veuillez écrire un message.'); valid = false; }
		if(consent && !consent.checked){ showError('error-consent','Vous devez accepter le traitement des données.'); valid = false; }

		if(!valid) return;

		// Simulation d'envoi — ici on pourrait appeler une API ou Formspree
		const success = document.getElementById('form-success');
		if(success){
			success.hidden = false;
			contactForm.reset();
			// cacher le message après 6s
			setTimeout(()=> success.hidden = true, 6000);
		}
	});
}
