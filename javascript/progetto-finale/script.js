const getCategories = async () => {
  try {
    console.log("🔍 Fetching categories...");
    const response = await fetch("./data/categories.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ Categories loaded:", data.length);
    return data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
};

const getCities = async () => {
  try {
    console.log("🔍 Fetching cities...");
    const response = await fetch("./data/cities.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ Cities loaded:", data.length);
    return data;
  } catch (error) {
    console.error("❌ Error fetching cities:", error);
    return [];
  }
};

const getSales = async () => {
  try {
    console.log("🔍 Fetching sales data...");
    const response = await fetch("./data/sales_dataset.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ Sales loaded:", data.length, "products");
    return data;
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

const searchSales = async (query, category = "", city = "") => {
  try {
    // Combina gli annunci dal dataset e quelli del localStorage
    const salesFromDataset = await getSales();
    const userAds = getUserAdsFromLocalStorage();
    const allSales = [...salesFromDataset, ...userAds];

    return allSales.filter((sale) => {
      // Ricerca per testo (titolo o descrizione)
      const matchesQuery =
        !query ||
        sale.titolo.toLowerCase().includes(query.toLowerCase()) ||
        sale.descrizione.toLowerCase().includes(query.toLowerCase());

      // Filtro per categoria
      const matchesCategory =
        !category ||
        category === "all-categories" ||
        sale.categoria.toLowerCase() === category.toLowerCase();

      // Filtro per città
      const matchesCity =
        !city || sale.citta.toLowerCase() === city.toLowerCase();

      return matchesQuery && matchesCategory && matchesCity;
    });
  } catch (error) {
    console.error("Error searching sales:", error);
    return [];
  }
};

const getSaleById = async (id) => {
  try {
    // Combina gli annunci dal dataset e quelli del localStorage
    const salesFromDataset = await getSales();
    const userAds = getUserAdsFromLocalStorage();
    const allSales = [...salesFromDataset, ...userAds];

    const sale = allSales.find((sale) => sale.id === id);
    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }
    return sale;
  } catch (error) {
    console.error("Error fetching sale by ID:", error);
    return null;
  }
};

const populateCategories = async () => {
  try {
    const categories = await getCategories();
    const categoriesSelect = document.getElementById("categories");

    if (categoriesSelect) {
      // Pulisce le opzioni esistenti tranne la prima
      categoriesSelect.innerHTML =
        '<option value="all-categories">Tutte le categorie</option>';

      // Aggiunge le categorie
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoriesSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error populating categories:", error);
  }
};

const populateCities = async () => {
  try {
    const cities = await getCities();
    const citiesSelect = document.getElementById("cities");

    if (citiesSelect) {
      // Pulisce le opzioni esistenti tranne la prima
      citiesSelect.innerHTML = '<option value="">Tutta Italia</option>';

      // Aggiunge le città
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citiesSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error populating cities:", error);
  }
};

const saleCard = (data) => {
  const card = document.createElement("div");
  card.className =
    "bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-300 cursor-pointer";

  // Formatta la data
  const date = new Date(data.data_pubblicazione);
  const formattedDate = date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  card.innerHTML = `
      <div class="relative">
        <img 
          src="${data.immagine_principale}" 
          alt="${data.titolo}" 
          class="w-full h-48 object-cover"
          onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.0.3'"
        />
        <div class="absolute top-3 left-3">
          <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ${data.categoria}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <span class="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            ${formattedDate}
          </span>
        </div>
      </div>
      
      <div class="p-6">
        <h3 class="font-bold text-xl mb-3 text-white line-clamp-2 leading-tight">
          ${data.titolo}
        </h3>
        
        <div class="flex items-center justify-between mb-4">
          <p class="text-red-500 font-bold text-2xl">€${data.prezzo.toLocaleString(
            "it-IT"
          )}</p>
          <div class="flex items-center text-slate-400 text-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${data.citta}
          </div>
        </div>
        
        <p class="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed">
          ${data.descrizione}
        </p>
        
        <div class="flex items-center justify-between pt-4 border-t border-slate-700">
          <div class="flex items-center text-slate-400 text-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M8 11V7a2 2 0 012-2h4a2 2 0 012 2v4"/>
            </svg>
            ${formattedDate}
          </div>
          <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer">
            Dettagli
          </button>
        </div>
      </div>
    `;

  // Aggiungi event listener per navigare al dettaglio del prodotto
  card.addEventListener("click", (e) => {
    console.log("🖱️ Card clicked, target:", e.target.tagName);
    console.log("🆔 Product ID:", data.id);

    // Previeni il comportamento predefinito se cliccato su un link o button
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
      console.log("⛔ Click on button/link, preventing default");
      e.preventDefault();
    }

    const detailUrl = `pages/product-detail.html?id=${data.id}`;
    console.log("🔗 Navigating to:", detailUrl);
    window.location.href = detailUrl;
  });

  return card;
};

const displaySearchResults = (results, query, category, city) => {
  const resultsContainer = document.getElementById("search-results");
  const featuredSection =
    document.querySelector("#featured-products").parentElement;

  if (!resultsContainer) return;

  // Pulisce i risultati precedenti
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    // Mostra messaggio "nessun risultato"
    resultsContainer.innerHTML = `
      <div class="bg-slate-800 p-8 rounded-lg text-center">
        <svg class="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">Nessun risultato trovato</h3>
        <p class="text-slate-400">Prova a modificare i filtri di ricerca</p>
      </div>
    `;
    featuredSection.style.display = "block";
    return;
  }

  // Crea l'header dei risultati
  const filters = [];
  if (query) filters.push(`"${query}"`);
  if (category && category !== "all-categories") filters.push(category);
  if (city) filters.push(city);

  const filtersText = filters.length > 0 ? ` per: ${filters.join(", ")}` : "";

  const resultsHeader = document.createElement("div");
  resultsHeader.className = "mb-6";
  resultsHeader.innerHTML = `
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-800 p-6 rounded-lg">
      <div>
        <h2 class="text-2xl font-bold text-white mb-2">
          Risultati della ricerca
        </h2>
        <p class="text-slate-300" id="results-count">
          ${results.length} ${
    results.length === 1 ? "risultato trovato" : "risultati trovati"
  }${filtersText}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto search-header-actions">
        <select id="sort-by" class="px-3 py-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:border-red-500 focus:outline-none text-sm">
          <option value="date-desc">Più recenti</option>
          <option value="date-asc">Meno recenti</option>
          <option value="price-asc">Prezzo crescente</option>
          <option value="price-desc">Prezzo decrescente</option>
        </select>
        <button id="clear-search" class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md text-sm transition-colors cursor-pointer">
          Pulisci filtri
        </button>
      </div>
    </div>
  `;

  resultsContainer.appendChild(resultsHeader);

  // Crea la griglia dei risultati
  const resultsGrid = document.createElement("div");
  resultsGrid.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  resultsGrid.id = "results-grid";

  // Aggiunge i prodotti
  results.forEach((sale) => {
    const card = saleCard(sale);
    resultsGrid.appendChild(card);
  });

  resultsContainer.appendChild(resultsGrid);

  // Nasconde la sezione prodotti in evidenza
  featuredSection.style.display = "none";

  // Aggiunge event listener per il pulsante "Pulisci filtri"
  const clearButton = document.getElementById("clear-search");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      document.getElementById("search-input").value = "";
      document.getElementById("categories").value = "all-categories";
      document.getElementById("cities").value = "";
      document.getElementById("search-results").innerHTML = "";
      document.querySelector("#featured-products").parentElement.style.display =
        "block";
    });
  }

  // Aggiunge event listener per l'ordinamento
  const sortSelect = document.getElementById("sort-by");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const sortedResults = sortResults(results, sortSelect.value);
      updateResultsGrid(sortedResults);
    });
  }
};

const performSearch = async () => {
  const query = document.getElementById("search-input").value.trim();
  const category = document.getElementById("categories").value;
  const city = document.getElementById("cities").value;

  // Mostra loading
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = `
    <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
      <p class="text-slate-300">Ricerca in corso...</p>
    </div>
  `;

  try {
    const results = await searchSales(query, category, city);
    displaySearchResults(results, query, category, city);
  } catch (error) {
    console.error("Error performing search:", error);
    resultsContainer.innerHTML = `
      <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
        <p class="text-red-400">Errore durante la ricerca. Riprova.</p>
      </div>
    `;
  }
};

const setupSearchEventListeners = () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categoriesSelect = document.getElementById("categories");
  const citiesSelect = document.getElementById("cities");

  // Ricerca con click del pulsante
  if (searchButton) {
    searchButton.addEventListener("click", performSearch);
  }

  // Ricerca con Enter
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  // Ricerca automatica quando cambiano i filtri
  if (categoriesSelect) {
    categoriesSelect.addEventListener("change", () => {
      const query = searchInput ? searchInput.value.trim() : "";
      if (query || categoriesSelect.value !== "all-categories") {
        performSearch();
      }
    });
  }

  if (citiesSelect) {
    citiesSelect.addEventListener("change", () => {
      const query = searchInput ? searchInput.value.trim() : "";
      if (query || citiesSelect.value) {
        performSearch();
      }
    });
  }
};

// === UTILITY FUNCTIONS ===

const saveAdToLocalStorage = (ad) => {
  try {
    const existingAds = JSON.parse(localStorage.getItem("userAds") || "[]");
    existingAds.push(ad);
    localStorage.setItem("userAds", JSON.stringify(existingAds));
    console.log("Annuncio salvato nel localStorage:", ad);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw error;
  }
};

const refreshFeaturedProducts = async () => {
  try {
    const salesFromDataset = await getSales();
    const userAds = getUserAdsFromLocalStorage();
    const allSales = [...salesFromDataset, ...userAds];

    const featuredProducts = document.getElementById("featured-products");

    if (featuredProducts && allSales.length > 0) {
      const latestSales = allSales
        .sort(
          (a, b) =>
            new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
        )
        .slice(0, 6);

      featuredProducts.innerHTML = "";
      featuredProducts.className =
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

      latestSales.forEach((sale) => {
        const card = saleCard(sale);
        featuredProducts.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error refreshing featured products:", error);
  }
};

const showSuccessMessage = (message) => {
  const successDiv = document.createElement("div");
  successDiv.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 notification-enter";
  successDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      ${message}
    </div>
  `;

  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.classList.remove("notification-enter");
    successDiv.classList.add("notification-exit");
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
};

const showErrorMessage = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.className =
    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 notification-enter";
  errorDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      ${message}
    </div>
  `;

  document.body.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.classList.remove("notification-enter");
    errorDiv.classList.add("notification-exit");
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 300);
  }, 3000);
};

// Debug functions
const debugLocalStorageAds = () => {
  const userAds = getUserAdsFromLocalStorage();
  console.log("Annunci nel localStorage:", userAds);
  console.log(`Totale annunci salvati: ${userAds.length}`);
  return userAds;
};

const clearLocalStorageAds = () => {
  localStorage.removeItem("userAds");
  console.log("Tutti gli annunci sono stati rimossi dal localStorage");
  refreshFeaturedProducts();
};

const simulateLogin = () => {
  localStorage.setItem("isLogged", "true");
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: "test-user",
      email: "test@example.com",
      name: "Test User",
    })
  );
  console.log("✅ Simulazione login effettuata");
};

const simulateLogout = () => {
  localStorage.setItem("isLogged", "false");
  localStorage.removeItem("currentUser");
  console.log("❌ Simulazione logout effettuata");
};

// === MODAL COMPONENT INITIALIZATION ===

const initAdModalComponent = async () => {
  try {
    const { initAdModal } = await import("./components/ad-modal.js");
    const modal = await initAdModal();

    const openModalBtn = document.getElementById("open-modal-btn");
    if (openModalBtn) {
      openModalBtn.addEventListener("click", () => {
        modal.show();
      });
    }

    return modal;
  } catch (error) {
    console.error(
      "Errore durante l'inizializzazione del componente modale:",
      error
    );
  }
};

// === FALLBACK INITIALIZATION ===

// Funzione di inizializzazione che può essere chiamata manualmente
window.initApp = async () => {
  console.log("🔧 Manual app initialization started...");

  try {
    await populateCategories();
    await populateCities();

    const sales = await getSales();
    const featuredProducts = document.getElementById("featured-products");

    console.log(
      "🎯 Manual init - Featured products element:",
      featuredProducts
    );
    console.log("📊 Manual init - Sales data:", sales.length, "items");

    if (featuredProducts && sales.length > 0) {
      const latestSales = sales
        .sort(
          (a, b) =>
            new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
        )
        .slice(0, 6);

      featuredProducts.innerHTML = "";
      featuredProducts.className =
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

      latestSales.forEach((sale, index) => {
        console.log(
          `🔄 Manual init - Creating card ${index + 1}:`,
          sale.titolo
        );
        const card = saleCard(sale);
        featuredProducts.appendChild(card);
      });

      console.log("✅ Manual initialization completed successfully!");
    }
  } catch (error) {
    console.error("💥 Manual initialization error:", error);
  }
};

// Test diretto nel caso il DOM sia già caricato
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("🏃‍♂️ DOM already loaded, running immediate initialization...");
  setTimeout(() => window.initApp(), 100);
}

// Esponi le funzioni necessarie globalmente
window.getCategories = getCategories;
window.getCities = getCities;
window.saveAdToLocalStorage = saveAdToLocalStorage;
window.refreshFeaturedProducts = refreshFeaturedProducts;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;
window.debugLocalStorageAds = debugLocalStorageAds;
window.clearLocalStorageAds = clearLocalStorageAds;
window.simulateLogin = simulateLogin;
window.simulateLogout = simulateLogout;

// === INITIALIZATION ===

document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Starting application initialization...");

  try {
    // Popolamento categorie e città
    console.log("📋 Populating categories and cities...");
    await populateCategories();
    await populateCities();

    // Caricamento prodotti
    console.log("🛍️ Loading sales data...");
    const sales = await getSales();
    const featuredProducts = document.getElementById("featured-products");

    console.log("🎯 Featured products element:", featuredProducts);
    console.log("📊 Sales data:", sales.length, "items");

    if (featuredProducts && sales.length > 0) {
      console.log("✅ Creating product cards...");
      const latestSales = sales
        .sort(
          (a, b) =>
            new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
        )
        .slice(0, 6);

      console.log("📋 Latest sales to display:", latestSales.length);

      featuredProducts.innerHTML = "";
      featuredProducts.className =
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

      latestSales.forEach((sale, index) => {
        console.log(`🔄 Creating card ${index + 1}:`, sale.titolo);
        const card = saleCard(sale);
        featuredProducts.appendChild(card);
      });

      console.log("✅ All product cards created successfully!");
    } else if (featuredProducts) {
      console.log("⚠️ No sales data or missing element");
      featuredProducts.innerHTML =
        '<p class="text-slate-400 text-lg">Nessun prodotto disponibile</p>';
    } else {
      console.error("❌ Featured products element not found!");
    }

    // Setup eventi
    console.log("⚙️ Setting up event listeners...");
    setupSearchEventListeners();
    await initAdModalComponent();

    console.log("🎉 Dashboard inizializzato con successo");
  } catch (error) {
    console.error("💥 Errore durante l'inizializzazione:", error);
  }
});

// Funzioni di ordinamento
const sortResults = (results, sortBy) => {
  const sortedResults = [...results];

  switch (sortBy) {
    case "date-desc":
      return sortedResults.sort(
        (a, b) =>
          new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
      );
    case "date-asc":
      return sortedResults.sort(
        (a, b) =>
          new Date(a.data_pubblicazione) - new Date(b.data_pubblicazione)
      );
    case "price-asc":
      return sortedResults.sort((a, b) => a.prezzo - b.prezzo);
    case "price-desc":
      return sortedResults.sort((a, b) => b.prezzo - a.prezzo);
    default:
      return sortedResults;
  }
};

const updateResultsGrid = (results) => {
  const resultsGrid = document.getElementById("results-grid");
  if (!resultsGrid) return;

  resultsGrid.innerHTML = "";

  if (results.length === 0) {
    resultsGrid.innerHTML = `
      <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
        <svg class="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">Nessun risultato trovato</h3>
        <p class="text-slate-400">Prova a modificare i filtri di ricerca</p>
      </div>
    `;
    return;
  }

  results.forEach((sale) => {
    const card = saleCard(sale);
    resultsGrid.appendChild(card);
  });
};
