// Navbar Component - Semplice e Funzionale
import { showLoginRequiredMessage } from "./ad-modal.js";
import { getCurrentPage, getNavigationPath } from "../utils/path-helper.js";

let isMenuOpen = false;

// Definisci gli elementi di navigazione
function getNavItems() {
  const currentPage = getCurrentPage();

  // Controlla se l'utente è loggato usando il nuovo sistema
  const loggedUser = localStorage.getItem("loggedUser");
  const isLogged = loggedUser ? JSON.parse(loggedUser).isLogged : false;
  const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

  // Elementi base della navbar
  const baseItems = [
    {
      name: "Home",
      href: getNavigationPath("home"),
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>`,
      isActive: currentPage === "home",
    },
    {
      name: "Categorie",
      href: getNavigationPath("categories"),
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>`,
      isActive: currentPage === "categories",
    },
  ];

  // Elementi specifici per utenti loggati/non loggati
  const authItems = isLogged
    ? [
        {
          name: "Profilo",
          href: getNavigationPath("profile"),
          icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>`,
          isActive: currentPage === "profile",
        },
      ]
    : [
        {
          name: "Accedi",
          href: getNavigationPath("login"),
          icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>`,
          isActive: currentPage === "login",
        },
        {
          name: "Registrati",
          href: getNavigationPath("register"),
          icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>`,
          isActive: currentPage === "register",
        },
      ];

  // Pulsante "Vendi Subito"
  const sellButton = {
    name: "Vendi Subito",
    href: "#",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-2.599-3A3.002 3.002 0 0012 19c1.11 0 2.08-.402 2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>`,
    isActive: false,
    isButton: true,
    id: "navbar-sell-btn",
  };

  return [...baseItems, ...authItems, sellButton];
}

// Toggle menu mobile
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  if (isMenuOpen) {
    mobileMenu.classList.remove("hidden");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
}

// Crea il navbar HTML
function createNavbar() {
  const navItems = getNavItems();
  const currentPage = getCurrentPage();
  const loggedUser = localStorage.getItem("loggedUser");
  const isLogged = loggedUser ? JSON.parse(loggedUser).isLogged : false;

  // Funzione per creare un elemento di navigazione normale
  const createNavItem = (item, isMobile = false) => {
    // Elemento normale (senza dropdown)
    return `
      <li>
        <a href="${item.href}" 
           ${item.id ? `id="${item.id}${isMobile ? "-mobile" : ""}"` : ""}
           class="${
             item.isButton
               ? `bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:text-white hover:to-red-700 px-5 py-${
                   isMobile ? "3" : "2.5"
                 } rounded-lg font-semibold shadow-lg ${
                   isMobile ? "block text-center" : ""
                 }`
               : ""
           } 
                  ${
                    item.isActive
                      ? "text-red-500 font-semibold"
                      : "text-white hover:text-red-500"
                  } 
                  transition-all duration-200 flex items-center gap-${
                    isMobile ? "3" : "2"
                  } ${isMobile ? "py-3" : "py-2"}"
        >
          ${item.icon}
          <span>${item.name}</span>
        </a>
      </li>
    `;
  };

  return `
    <header class="bg-slate-800 text-white p-4 mt-5 rounded-lg shadow-lg max-w-6xl mx-4 md:mx-auto">
      <nav class="flex justify-between items-center">
        <!-- Logo -->
        <a href="${
          currentPage === "home" ? "#" : "../index.html"
        }" class="flex items-baseline gap-1 hover:opacity-80 transition-opacity">
          <p class="text-red-500 font-bold text-xl">SVENDOL</p>
          <img src="${
            currentPage === "home" ? "assets/logo.svg" : "../assets/logo.svg"
          }" alt="MarketDeal Logo" class="size-4">
        </a>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center gap-6">
          ${navItems.map((item) => createNavItem(item, false)).join("")}
        </ul>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-button" class="md:hidden text-white hover:text-red-500 transition-colors cursor-pointer">
          <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Navigation Menu -->
      <div id="mobile-menu" class="hidden md:hidden mt-4 pt-4 border-t border-slate-700">
        <ul class="flex flex-col space-y-3">
          ${navItems.map((item) => createNavItem(item, true)).join("")}
        </ul>
      </div>
    </header>
  `;
}

// Aggiungi event listeners
function attachEventListeners() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
  }

  // Gestisci click su "Vendi Subito" (desktop e mobile)
  const sellBtn = document.getElementById("navbar-sell-btn");
  const sellBtnMobile = document.getElementById("navbar-sell-btn-mobile");

  if (sellBtn) {
    sellBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSellButtonClick();
    });
  }

  if (sellBtnMobile) {
    sellBtnMobile.addEventListener("click", (e) => {
      e.preventDefault();
      handleSellButtonClick();
      // Chiudi il menu mobile se aperto
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  }

  // Chiudi menu mobile quando clicchi su un link (escluso "Vendi Subito")
  const mobileMenuLinks = document.querySelectorAll(
    "#mobile-menu a:not(#navbar-sell-btn-mobile)"
  );
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Chiudi menu mobile quando si ridimensiona la finestra
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      toggleMobileMenu();
    }
  });
}

// Funzione per mostrare notifica di errore
function showErrorNotification(message) {
  // Rimuovi eventuali notifiche esistenti
  const existingNotification = document.querySelector(".error-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Crea la notifica
  const notification = document.createElement("div");
  notification.className =
    "error-notification fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4";
  notification.innerHTML = `
    <div class="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3">⚠️ Errore</h3>
        <p class="text-slate-300 mb-6">${message}</p>
        <div class="flex justify-center">
          <button data-close-notification="true"
                  class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  `;

  // Aggiungi al body
  document.body.appendChild(notification);

  // Event listener per il pulsante chiudi
  const closeButton = notification.querySelector(
    '[data-close-notification="true"]'
  );
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      notification.remove();
    });
  }

  // Chiudi anche cliccando sul backdrop
  notification.addEventListener("click", (e) => {
    if (e.target === notification) {
      notification.remove();
    }
  });

  // Rimuovi automaticamente dopo 8 secondi
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 8000);
}

// Funzione per chiudere le notifiche
window.closeNotification = function () {
  const loginNotification = document.querySelector(
    ".login-required-notification"
  );
  const errorNotification = document.querySelector(".error-notification");

  if (loginNotification) {
    loginNotification.remove();
  }
  if (errorNotification) {
    errorNotification.remove();
  }
};

// Gestisce il logout
window.handleLogout = () => {
  localStorage.removeItem("loggedUser");

  // Mostra notifica di logout
  if (window.showSuccessMessage) {
    window.showSuccessMessage("Logout effettuato con successo!");
  }

  // Ricarica la navbar per aggiornare i link
  setTimeout(() => {
    initNavbar();
  }, 500);
};

// Gestisci il click sul pulsante "Vendi Subito"
async function handleSellButtonClick() {
  // Controlla se l'utente è loggato usando il nuovo sistema
  const loggedUser = localStorage.getItem("loggedUser");
  const isLogged = loggedUser ? JSON.parse(loggedUser).isLogged : false;

  if (!isLogged) {
    showLoginRequiredMessage();
    return;
  }

  try {
    // Controlla se la modale è già inizializzata globalmente
    if (window.adModal && typeof window.adModal.show === "function") {
      window.adModal.show();
      return;
    }

    // Se siamo nella home page, la modale dovrebbe essere già disponibile
    const currentPage = getCurrentPage();
    if (currentPage === "home") {
      // Cerca il pulsante della modale nella home page e cliccalo
      const openModalBtn = document.getElementById("open-modal-btn");
      if (openModalBtn) {
        openModalBtn.click();
        return;
      }
    }

    // Fallback per altre pagine: import dinamico
    const modalPath = "../components/ad-modal.js";
    const { initAdModal } = await import(modalPath);
    window.adModal = await initAdModal();
    window.adModal.show();
  } catch (error) {
    console.error("Errore durante l'apertura della modale:", error);
    showErrorNotification(
      "Si è verificato un errore durante l'apertura della modale degli annunci."
    );
  }
}

// Inizializza il navbar
function initNavbar() {
  const navbarHTML = createNavbar();

  // Trova e sostituisci il navbar esistente o aggiungilo all'inizio del body
  const existingNavbar = document.querySelector("header");
  if (existingNavbar) {
    existingNavbar.outerHTML = navbarHTML;
  } else {
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
  }

  attachEventListeners();
}

// Auto-inizializza quando il DOM è caricato
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}
