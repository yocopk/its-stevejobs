// Footer Component - Semplice e Funzionale

// Funzione per mostrare feedback della newsletter
function showNewsletterFeedback(type, message) {
  // Rimuovi eventuali feedback esistenti
  const existingFeedback = document.querySelector(".newsletter-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Crea elemento feedback
  const feedback = document.createElement("div");
  feedback.className = `newsletter-feedback mt-3 p-3 rounded-md text-sm font-medium transition-all duration-300 opacity-0 ${
    type === "success"
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : "bg-red-500/20 text-red-400 border border-red-500/30"
  }`;

  feedback.innerHTML = `
    <div class="flex items-center gap-2">
      ${
        type === "success"
          ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
          : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
      }
      <span>${message}</span>
    </div>
  `;

  // Anima l'entrata del feedback
  setTimeout(() => {
    feedback.style.opacity = "1";
  }, 10);

  return feedback;
}

// Funzione per gestire l'iscrizione alla newsletter
function handleNewsletterSubscription(email) {
  // Validazione email semplice
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { success: false, message: "Per favore inserisci la tua email" };
  }

  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Per favore inserisci un indirizzo email valido",
    };
  }

  // Simula invio (sempre successo per demo)
  return {
    success: true,
    message: "Grazie! Iscrizione completata con successo 🎉",
  };
}

// Funzione per configurare gli event listener della newsletter
function setupNewsletterEvents() {
  // Trova il pulsante e l'input email usando gli ID
  const subscribeButton = document.getElementById("newsletter-subscribe");
  const emailInput = document.getElementById("newsletter-email");

  if (!subscribeButton || !emailInput) return;

  // Event listener per il pulsante
  subscribeButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const button = e.target;
    const originalText = button.textContent;

    // Cambia stato del pulsante durante il "caricamento"
    button.disabled = true;
    button.textContent = "Invio...";
    button.classList.add("opacity-75");

    // Simula ritardo di rete
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Gestisci l'iscrizione
    const result = handleNewsletterSubscription(email);

    // Mostra feedback
    const feedback = showNewsletterFeedback(
      result.success ? "success" : "error",
      result.message
    );

    // Inserisci feedback dopo il form
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.appendChild(feedback);
    }

    // Ripristina il pulsante
    button.disabled = false;
    button.textContent = originalText;
    button.classList.remove("opacity-75");

    // Se successo, svuota l'input
    if (result.success) {
      emailInput.value = "";
    }

    // Rimuovi feedback dopo 5 secondi
    setTimeout(() => {
      if (feedback.parentElement) {
        feedback.style.opacity = "0";
        setTimeout(() => feedback.remove(), 300);
      }
    }, 5000);
  });

  // Event listener per il tasto Enter nell'input email
  emailInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      subscribeButton.click();
    }
  });
}

// Ottieni la pagina corrente
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("login")) return "login";
  if (path.includes("register")) return "register";
  if (path.includes("categories")) return "categories";
  if (path.includes("product-detail")) return "product-detail";
  if (path.includes("profile")) return "profile";
  if (path.includes("contact-form")) return "contact-form";
  if (path.includes("index") || path === "/" || path.endsWith("/"))
    return "home";
  return "other";
}

// Ottieni l'anno corrente
function getCurrentYear() {
  return new Date().getFullYear();
}

// Definisci i link del footer
function getFooterLinks() {
  return {
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>`,
      },
      {
        name: "Twitter",
        href: "#",
        icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>`,
      },
      {
        name: "Instagram",
        href: "#",
        icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.804C4.851 14.407 4.5 13.188 4.5 11.987c0-1.2.351-2.42.933-3.197.568-1.074 1.719-1.804 3.016-1.804 1.297 0 2.448.73 3.016 1.804.582.777.933 1.997.933 3.197 0 1.201-.351 2.42-.933 3.197-.568 1.074-1.719 1.804-3.016 1.804zm7.119 0c-1.297 0-2.448-.73-3.016-1.804-.582-.777-.933-1.996-.933-3.197 0-1.2.351-2.42.933-3.197.568-1.074 1.719-1.804 3.016-1.804 1.297 0 2.448.73 3.016 1.804.582.777.933 1.997.933 3.197 0 1.201-.351 2.42-.933 3.197-.568 1.074-1.719 1.804-3.016 1.804z"/>
              </svg>`,
      },
      {
        name: "LinkedIn",
        href: "#",
        icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>`,
      },
    ],
  };
}

// Crea il footer HTML
function createFooter() {
  const links = getFooterLinks();
  const currentYear = getCurrentYear();
  const currentPage = getCurrentPage();

  return `
    <footer class="bg-slate-800 text-white mt-16 py-12 px-4 rounded-lg shadow-lg max-w-6xl mx-4 md:mx-auto mb-5">
      <div class="max-w-6xl mx-auto">
        <!-- Footer Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <!-- Company Info -->
          <div>
            <a href="${
              currentPage === "home" ? "#" : "../index.html"
            }" class="flex items-baseline gap-1 mb-4 lg:justify-start justify-center hover:opacity-80 transition-opacity">
              <h3 class="text-xl font-bold text-red-500">SVENDOL</h3>
              <img src="${
                currentPage === "home"
                  ? "assets/logo.svg"
                  : "../assets/logo.svg"
              }" alt="SVENDOL Logo" class="size-4">
            </a>
            <p class="text-slate-300 text-sm leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              La tua piattaforma di fiducia per comprare e vendere online. 
              Scopri le migliori offerte nella tua zona.
            </p>
            
            <!-- Navigation Links -->
            <div class="mb-6">
              <div class="flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                <a href="${
                  currentPage === "home"
                    ? "pages/categories.html"
                    : "categories.html"
                }" 
                   class="text-slate-300 hover:text-red-500 transition-colors">
                  Categorie
                </a>
                <a href="${
                  currentPage === "home"
                    ? "pages/contact-form.html"
                    : "contact-form.html"
                }" 
                   class="text-slate-300 hover:text-red-500 transition-colors">
                  Contattaci
                </a>
                <a href="${
                  currentPage === "home" ? "pages/profile.html" : "profile.html"
                }" 
                   class="text-slate-300 hover:text-red-500 transition-colors">
                  Profilo
                </a>
              </div>
            </div>
            
            <div class="flex space-x-4 justify-center lg:justify-start">
              ${links.social
                .map(
                  (social) => `
                <a href="${social.href}" 
                   class="text-slate-400 hover:text-red-500 transition-colors"
                   title="${social.name}">
                  ${social.icon}
                </a>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Newsletter Subscription -->
          <div class="text-center lg:text-left">
            <h4 class="font-semibold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Rimani aggiornato
            </h4>
            <p class="text-slate-300 text-sm mb-4 max-w-md mx-auto lg:mx-0">
              Iscriviti alla nostra newsletter per ricevere le migliori offerte e aggiornamenti.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0" id="newsletter-form">
              <input 
                type="email" 
                id="newsletter-email"
                placeholder="La tua email..." 
                class="flex-1 px-4 py-2 rounded-md bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-red-500 focus:outline-none text-sm"
              />
              <button 
                type="button"
                id="newsletter-subscribe"
                class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium text-sm whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Iscriviti
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-slate-400 text-sm text-center md:text-left">
            © ${currentYear} SVENDOLO. Tutti i diritti riservati.
          </div>
          <div class="flex items-center gap-4 text-slate-400 text-sm">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Made in Italy
            </span>
            <span>•</span>
            <span>Versione 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Inizializza il footer
function initFooter() {
  const footerHTML = createFooter();

  // Trova e sostituisci il footer esistente o aggiungilo alla fine del body
  const existingFooter = document.querySelector("footer");
  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }

  // Configura gli eventi della newsletter dopo aver inserito il footer
  setTimeout(() => {
    setupNewsletterEvents();
  }, 100);
}

// Auto-inizializza quando il DOM è caricato
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooter);
} else {
  initFooter();
}
