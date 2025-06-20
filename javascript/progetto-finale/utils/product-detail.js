// === PRODUCT DETAIL PAGE LOGIC ===

// Funzioni per caricare i dati (riutilizziamo le stesse del main script)
const getSales = async () => {
  try {
    console.log("🔍 Fetching sales data for product detail...");
    const response = await fetch("../data/sales_dataset.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const salesFromDataset = await response.json();
    const userAds = getUserAdsFromLocalStorage();

    // Combina gli annunci dal dataset e quelli del localStorage
    const allSales = [...salesFromDataset, ...userAds];
    console.log(
      "✅ Sales loaded:",
      allSales.length,
      "products (including user ads)"
    );
    return allSales;
  } catch (error) {
    console.error("❌ Error fetching sales:", error);
    return [];
  }
};

const getUserAdsFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("userAds") || "[]");
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

// Funzione per ottenere un prodotto per ID
const getSaleById = async (id) => {
  try {
    console.log("🔍 Looking for product with ID:", id);

    // Combina gli annunci dal dataset e quelli del localStorage
    const allSales = await getSales(); // Ora include già gli annunci utente

    console.log("📊 Total sales to search:", allSales.length);

    // Converte l'ID a numero per confronto
    const numericId = parseInt(id);
    const sale = allSales.find(
      (sale) => sale.id === numericId || sale.id === id
    );

    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }

    console.log("✅ Product found:", sale.titolo);
    return sale;
  } catch (error) {
    console.error("❌ Error fetching sale by ID:", error);
    return null;
  }
};

// Funzione per ottenere l'ID dal URL
const getProductIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("🔗 Product ID from URL:", id);
  return id;
};

// Funzione per creare il HTML del dettaglio prodotto
const createProductDetailHTML = (product) => {
  // Formatta la data
  const date = new Date(product.data_pubblicazione);
  const formattedDate = date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Gestisce le immagini (se esiste galleria, altrimenti usa solo quella principale)
  const images =
    product.galleria_immagini && product.galleria_immagini.length > 0
      ? product.galleria_immagini
      : [product.immagine_principale];

  return `
    <!-- Product Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="bg-slate-800 rounded-lg overflow-hidden">
          <img
            id="main-image"
            src="${product.immagine_principale}"
            alt="${product.titolo}"
            class="w-full h-96 object-cover"
            onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.0.3'"
          />
        </div>

        <!-- Image Gallery -->
        ${
          images.length > 1
            ? `
        <div class="grid grid-cols-4 gap-2">
          ${images
            .map(
              (img, index) => `
            <button
              class="image-thumbnail bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all cursor-pointer"
              data-image="${img}"
            >
              <img
                src="${img}"
                alt="Immagine ${index + 1}"
                class="w-full h-20 object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.0.3'"
              />
            </button>
          `
            )
            .join("")}
        </div>
        `
            : ""
        }
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <!-- Title and Category -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              ${product.categoria}
            </span>
            <span class="text-slate-400 text-sm">
              Pubblicato il ${formattedDate}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">${product.titolo}</h1>
          <div class="flex items-center text-slate-400 text-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${product.citta}
          </div>
        </div>

        <!-- Price -->
        <div class="bg-slate-800 p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-sm mb-1">Prezzo</p>
              <p class="text-4xl font-bold text-red-500">€${product.prezzo.toLocaleString(
                "it-IT"
              )}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="bg-slate-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-white mb-4">Descrizione</h2>
          <p class="text-slate-300 leading-relaxed whitespace-pre-line">${
            product.descrizione
          }</p>
        </div>

        <!-- Seller Info (se disponibile) -->
        ${
          product.venditore
            ? `
        <div class="bg-slate-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-white mb-4">Venditore</h2>
          <div class="space-y-2">
            <p class="text-slate-300">
              <span class="font-medium">Nome:</span> ${product.venditore.nome}
            </p>
            <p class="text-slate-300">
              <span class="font-medium">Email:</span> 
              <a href="mailto:${
                product.venditore.email
              }" class="text-red-500 hover:text-red-400">
                ${product.venditore.email}
              </a>
            </p>
            ${
              product.venditore.telefono
                ? `
            <p class="text-slate-300">
              <span class="font-medium">Telefono:</span> 
              <a href="tel:${product.venditore.telefono}" class="text-red-500 hover:text-red-400">
                ${product.venditore.telefono}
              </a>
            </p>
            `
                : ""
            }
          </div>
        </div>
        `
            : ""
        }

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          ${
            product.venditore
              ? `
          <button
            id="contact-seller-btn"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
            data-seller-email="${product.venditore.email}"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contatta il venditore
          </button>
          `
              : ""
          }
          <button
            id="share-product-btn"
            class="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
            Condividi
          </button>
        </div>
      </div>
    </div>
  `;
};

// Funzione per cambiare l'immagine principale
window.changeMainImage = (imageSrc) => {
  const mainImage = document.getElementById("main-image");
  if (mainImage) {
    mainImage.src = imageSrc;
  }
};

// Funzione per contattare il venditore
window.contactSeller = (email) => {
  const subject = encodeURIComponent(
    "Interesse per il tuo annuncio su Svendolo"
  );
  const body = encodeURIComponent(
    "Ciao, sono interessato al tuo annuncio. Potresti darmi più informazioni?"
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

// Funzione per condividere il prodotto
window.shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href,
    });
  } else {
    // Fallback: copia il link negli appunti
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copiato negli appunti!");
      })
      .catch(() => {
        // Fallback del fallback
        prompt("Copia questo link:", window.location.href);
      });
  }
};

// Funzione per mostrare errori
const showError = (message) => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.innerHTML = `
      <div class="text-center">
        <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h2 class="text-xl font-semibold text-red-400 mb-2">Errore</h2>
          <p class="text-slate-300">${message}</p>
          <div class="mt-4">
            <button
              class="error-back-btn bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Torna indietro
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

// Funzione per aggiungere event listeners
const attachEventListeners = () => {
  // Event listener per il pulsante back principale
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      history.back();
    });
  }

  // Event listener per i thumbnails delle immagini
  const imageThumbnails = document.querySelectorAll(".image-thumbnail");
  imageThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const imageSrc = thumbnail.dataset.image;
      if (imageSrc) {
        changeMainImage(imageSrc);
      }
    });
  });

  // Event listener per il pulsante contatta venditore
  const contactBtn = document.getElementById("contact-seller-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const sellerEmail = contactBtn.dataset.sellerEmail;
      if (sellerEmail) {
        contactSeller(sellerEmail);
      }
    });
  }

  // Event listener per il pulsante condividi
  const shareBtn = document.getElementById("share-product-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      shareProduct();
    });
  }

  // Event listener per il pulsante back degli errori
  const errorBackBtns = document.querySelectorAll(".error-back-btn");
  errorBackBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      history.back();
    });
  });
};

// Inizializzazione della pagina
const initProductDetail = async () => {
  console.log("🚀 Initializing product detail page...");

  try {
    // Ottieni l'ID del prodotto dall'URL
    const productId = getProductIdFromURL();

    if (!productId) {
      throw new Error("ID del prodotto non trovato nell'URL");
    }

    // Carica il prodotto
    const product = await getSaleById(productId);

    if (!product) {
      throw new Error("Prodotto non trovato");
    }

    // Nasconde il loading e mostra il contenuto
    const loadingElement = document.getElementById("loading");
    const contentElement = document.getElementById("product-content");

    if (loadingElement) {
      loadingElement.classList.add("hidden");
    }

    if (contentElement) {
      contentElement.classList.remove("hidden");
      contentElement.innerHTML = createProductDetailHTML(product);
    }

    // Aggiorna il titolo della pagina
    document.title = `${product.titolo} - Svendolo`;

    // Aggiungi gli event listeners
    attachEventListeners();

    console.log("✅ Product detail page initialized successfully");
  } catch (error) {
    console.error("💥 Error initializing product detail:", error);
    showError(error.message);
  }
};

// Auto-inizializza quando il DOM è caricato
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProductDetail);
} else {
  initProductDetail();
}
