// === COMPONENTE MODALE PER INSERIMENTO ANNUNCI ===
import { getNavigationPath } from "../utils/path-helper.js";

let modalInstance = null;

// Funzione per creare la modale
const createAdModal = () => {
  const modalHTML = `
    <div id="ad-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div class="bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] md:max-h-[100vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">Pubblica un nuovo annuncio</h3>
          <button id="close-modal-btn" class="text-slate-400 hover:text-white text-2xl cursor-pointer">&times;</button>
        </div>
        
        <form id="ad-form" class="space-y-4">
          <!-- Titolo -->
          <div>
            <label for="ad-title" class="block text-sm font-medium text-slate-300 mb-2">Titolo *</label>
            <input 
              type="text" 
              id="ad-title" 
              name="title" 
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              placeholder="Inserisci il titolo dell'annuncio"
            />
          </div>

          <!-- Descrizione -->
          <div>
            <label for="ad-description" class="block text-sm font-medium text-slate-300 mb-2">Descrizione *</label>
            <textarea 
              id="ad-description" 
              name="description" 
              required
              rows="3"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-red-500 resize-none"
              placeholder="Descrivi il tuo prodotto"
            ></textarea>
          </div>

          <!-- Prezzo -->
          <div>
            <label for="ad-price" class="block text-sm font-medium text-slate-300 mb-2">Prezzo (€) *</label>
            <input 
              type="number" 
              id="ad-price" 
              name="price" 
              required
              min="0"
              step="0.01"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              placeholder="0.00"
            />
          </div>

          <!-- Città -->
          <div>
            <label for="ad-city" class="block text-sm font-medium text-slate-300 mb-2">Città *</label>
            <select 
              id="ad-city" 
              name="city" 
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:border-red-500"
            >
              <option value="">Seleziona una città</option>
              <!-- Le città verranno popolate dinamicamente -->
            </select>
          </div>

          <!-- Categoria -->
          <div>
            <label for="ad-category" class="block text-sm font-medium text-slate-300 mb-2">Categoria *</label>
            <select 
              id="ad-category" 
              name="category" 
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:border-red-500"
            >
              <option value="">Seleziona una categoria</option>
              <!-- Le categorie verranno popolate dinamicamente -->
            </select>
          </div>

          <!-- Immagine -->
          <div>
            <label for="ad-image" class="block text-sm font-medium text-slate-300 mb-2">Immagine (opzionale)</label>
            <input 
              type="file" 
              id="ad-image" 
              name="image" 
              accept="image/*"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-red-500 file:text-white hover:file:bg-red-600 file:cursor-pointer"
            />
          </div>

          <!-- Bottoni -->
          <div class="flex gap-3 pt-4">
            <button 
              type="button" 
              id="cancel-btn"
              class="flex-1 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Annulla
            </button>
            <button 
              type="submit"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium cursor-pointer"
            >
              Pubblica annuncio
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  return modalHTML;
};

// Funzione per inizializzare la modale
const initAdModal = async () => {
  if (modalInstance) {
    return modalInstance;
  }

  // Crea e aggiungi la modale al DOM se non esiste
  if (!document.getElementById("ad-modal")) {
    document.body.insertAdjacentHTML("beforeend", createAdModal());
  }

  const modal = document.getElementById("ad-modal");
  const form = document.getElementById("ad-form");

  // Popola le select
  await populateModalSelects();

  // Setup validazione form
  if (window.FormValidation && window.FormValidation.setupAdFormValidation) {
    window.FormValidation.setupAdFormValidation(form);
  }

  // Setup event listeners
  setupModalEventListeners();

  modalInstance = {
    show: showModal,
    hide: hideModal,
    element: modal,
  };

  return modalInstance;
};

// Funzione per mostrare la modale
const showModal = () => {
  // Controlla se l'utente è loggato usando il nuovo sistema
  const loggedUser = localStorage.getItem("loggedUser");
  const isLogged = loggedUser ? JSON.parse(loggedUser).isLogged : false;

  if (!isLogged) {
    showLoginRequiredMessage();
    return;
  }

  const modal = document.getElementById("ad-modal");
  modal.classList.remove("hidden");
  modal.querySelector(".bg-slate-800").classList.add("modal-enter");
  document.body.style.overflow = "hidden";
};

// Funzione per nascondere la modale
const hideModal = () => {
  const modal = document.getElementById("ad-modal");
  const modalContent = modal.querySelector(".bg-slate-800");
  modalContent.classList.remove("modal-enter");
  modalContent.classList.add("modal-exit");

  setTimeout(() => {
    modal.classList.add("hidden");
    modalContent.classList.remove("modal-exit");
    document.body.style.overflow = "auto";
    document.getElementById("ad-form").reset();

    // Pulisci le classi di validazione
    const requiredFields = document.querySelectorAll("#ad-form [required]");
    requiredFields.forEach((field) => {
      field.classList.remove("form-error", "form-success");
      const existingError = field.parentNode.querySelector(".error-message");
      if (existingError) {
        existingError.remove();
      }
    });
  }, 200);
};

// Setup event listeners per la modale
const setupModalEventListeners = () => {
  const modal = document.getElementById("ad-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const adForm = document.getElementById("ad-form");

  // Chiudi modale (X)
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", hideModal);
  }

  // Chiudi modale (Annulla)
  if (cancelBtn) {
    cancelBtn.addEventListener("click", hideModal);
  }

  // Chiudi modale (click outside)
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });
  }

  // Gestisci invio form
  if (adForm) {
    adForm.addEventListener("submit", handleAdSubmission);
  }
};

// Popola le select della modale
const populateModalSelects = async () => {
  try {
    // Funzioni importate dal file principale
    const categories = await window.getCategories();
    const cities = await window.getCities();

    // Popola le città
    const adCitySelect = document.getElementById("ad-city");
    if (adCitySelect) {
      adCitySelect.innerHTML = '<option value="">Seleziona una città</option>';
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        adCitySelect.appendChild(option);
      });
    }

    // Popola le categorie
    const adCategorySelect = document.getElementById("ad-category");
    if (adCategorySelect) {
      adCategorySelect.innerHTML =
        '<option value="">Seleziona una categoria</option>';
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        adCategorySelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error populating modal selects:", error);
  }
};

// Gestione invio form
const handleAdSubmission = async (e) => {
  e.preventDefault();

  // Valida tutti i campi obbligatori
  const form = e.target;
  let isValid = true;

  if (window.FormValidation && window.FormValidation.validateAdForm) {
    isValid = window.FormValidation.validateAdForm(form);
  }

  if (!isValid) {
    window.showErrorMessage(
      "Per favore, correggi gli errori nel form prima di continuare."
    );
    return;
  }

  // Mostra stato di caricamento
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <div class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Pubblicazione...
    </div>
  `;

  try {
    const formData = new FormData(e.target);
    const imageFile = formData.get("image");

    // Ottieni le informazioni dell'utente loggato
    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : null;

    // Crea l'oggetto annuncio
    const newAd = {
      id: generateUniqueId(),
      titolo: formData.get("title"),
      descrizione: formData.get("description"),
      prezzo: parseFloat(formData.get("price")),
      citta: formData.get("city"),
      categoria: formData.get("category"),
      data_pubblicazione: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD per consistency
      immagine_principale: await handleImageUpload(imageFile),
      galleria_immagini: [await handleImageUpload(imageFile)],
      venditore: {
        nome: loggedUser?.fullName || "Utente",
        email: loggedUser?.email || "email@example.com",
        telefono: loggedUser?.telefono || "+39 000 0000000",
      },
    };

    // Salva nel localStorage
    window.saveAdToLocalStorage(newAd);

    // Mostra messaggio di successo
    window.showSuccessMessage("Annuncio pubblicato con successo!");

    // Chiudi la modale
    hideModal();

    // Ricarica la vista per mostrare il nuovo annuncio
    if (window.refreshFeaturedProducts) {
      await window.refreshFeaturedProducts();
    }
  } catch (error) {
    console.error("Error saving ad:", error);
    window.showErrorMessage(
      "Errore durante la pubblicazione dell'annuncio. Riprova."
    );
  } finally {
    // Ripristina il pulsante
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};

// Utility functions
const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const handleImageUpload = (imageFile) => {
  return new Promise((resolve) => {
    if (!imageFile || imageFile.size === 0) {
      // Immagine placeholder se non viene caricata nessuna immagine
      resolve(
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.0.3"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(imageFile);
  });
};

// Funzione per mostrare il messaggio di login richiesto
const showLoginRequiredMessage = () => {
  // Rimuovi eventuali notifiche esistenti
  const existingNotification = document.querySelector(
    ".login-required-notification"
  );
  if (existingNotification) {
    existingNotification.classList.add("exit");
    setTimeout(() => existingNotification.remove(), 300);
  }

  // Determina i percorsi corretti usando l'helper
  const loginPath = getNavigationPath("login");
  const registerPath = getNavigationPath("register");

  // Crea la notifica
  const notification = document.createElement("div");
  notification.className =
    "login-required-notification fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4";
  notification.innerHTML = `
    <div class="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-3">🔒 Accesso Richiesto</h3>
        <p class="text-slate-300 mb-6">Devi essere loggato per pubblicare un annuncio.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a href="${loginPath}" class="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center">
            Accedi
          </a>
          <a href="${registerPath}" class="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center">
            Registrati
          </a>
          <button data-close-notification class="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  `;

  // Aggiungi al body
  document.body.appendChild(notification);

  // Rimuovi automaticamente dopo 8 secondi
  setTimeout(() => {
    if (notification.parentElement) {
      closeLoginNotification(notification.querySelector("button"));
    }
  }, 8000);
};

// Funzione per chiudere la notifica di login
const closeLoginNotification = (button) => {
  const notification = button.closest(".login-required-notification");
  if (notification) {
    notification.classList.add("exit");
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }
};

// Event delegation per la chiusura delle notifiche
document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close-notification")) {
    closeLoginNotification(e.target);
  }
});

// Auto-inizializzazione quando il DOM è pronto
async function autoInit() {
  // Inizializza la modale e rendila disponibile globalmente
  window.adModal = await initAdModal();

  // Setup event listener per il pulsante "Pubblica un annuncio" nella home
  const openModalBtn = document.getElementById("open-modal-btn");
  if (openModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Controlla se l'utente è loggato
      const loggedUser = localStorage.getItem("loggedUser");
      const isLogged = loggedUser ? JSON.parse(loggedUser).isLogged : false;

      if (!isLogged) {
        showLoginRequiredMessage();
        return;
      }

      // Mostra la modale
      window.adModal.show();
    });
  }
}

// Inizializza quando il DOM è caricato
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoInit);
} else {
  autoInit();
}

// Esporta le funzioni principali
export { initAdModal, showModal, hideModal, showLoginRequiredMessage };
