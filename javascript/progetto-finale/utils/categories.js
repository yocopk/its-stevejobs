// Utility functions per gestire i dati
const getCategories = async () => {
  try {
    const response = await fetch("../data/categories.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const getCities = async () => {
  try {
    const response = await fetch("../data/cities.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cities:", error);
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

const getSales = async () => {
  try {
    const response = await fetch("../data/sales_dataset.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const salesFromDataset = await response.json();
    const userAds = getUserAdsFromLocalStorage();

    // Combina gli annunci dal dataset e quelli del localStorage
    return [...salesFromDataset, ...userAds];
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};

const getSalesByCategory = async (category) => {
  try {
    const allSales = await getSales(); // Ora include già gli annunci utente
    return allSales.filter(
      (sale) => sale.categoria.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error("Error fetching sales by category:", error);
    return [];
  }
};

// Funzione per ottenere un'icona SVG per categoria
const getCategoryIcon = (category) => {
  const icons = {
    Elettronica: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>`,
    Sport: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>`,
    "Casa e Giardino": `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>`,
    Musica: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
    </svg>`,
    "Auto e Moto": `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m-4-5v9"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3 7H9l3-7z"/>
    </svg>`,
    Abbigliamento: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"/>
    </svg>`,
    Immobili: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>`,
  };

  return (
    icons[category] ||
    `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
  </svg>`
  );
};

// Funzione per creare una card categoria
const createCategoryCard = async (category) => {
  const sales = await getSalesByCategory(category);
  const count = sales.length;

  const card = document.createElement("div");
  card.className =
    "category-card bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-red-500 transition-all duration-300";

  card.innerHTML = `
    <div class="flex flex-col items-center text-center">
      <div class="bg-red-500 p-4 rounded-full mb-4 text-white">
        ${getCategoryIcon(category)}
      </div>
      <h3 class="text-xl font-bold text-white mb-2">${category}</h3>
      <p class="text-slate-400 text-sm mb-4">
        ${count} ${count === 1 ? "annuncio" : "annunci"}
      </p>
      <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full cursor-pointer">
        Esplora
      </button>
    </div>
  `;

  // Event listener per navigare alla categoria
  card.addEventListener("click", () => {
    showCategoryProducts(category);
    // Aggiorna URL senza ricaricare la pagina
    const url = new URL(window.location);
    url.searchParams.set("category", category);
    window.history.pushState({ category }, "", url);
  });

  return card;
};

// Funzione per creare una card prodotto
const createProductCard = (data) => {
  const card = document.createElement("div");
  card.className =
    "bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:border-red-500 transition-all duration-300 cursor-pointer fade-in";

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

  // Event listener per navigare al dettaglio del prodotto
  card.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
      e.preventDefault();
    }
    window.location.href = `product-detail.html?id=${data.id}`;
  });

  return card;
};

// Funzione per caricare e mostrare tutte le categorie
const loadCategories = async () => {
  const categoriesGrid = document.getElementById("categories-grid");
  const loadingSection = document.getElementById("loading-section");

  try {
    // Mostra loading
    loadingSection.classList.remove("hidden");
    categoriesGrid.innerHTML = "";

    const categories = await getCategories();

    // Nasconde loading
    loadingSection.classList.add("hidden");

    if (categories.length === 0) {
      categoriesGrid.innerHTML = `
        <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
          <p class="text-slate-400">Nessuna categoria disponibile</p>
        </div>
      `;
      return;
    }

    // Carica le categorie
    for (const category of categories) {
      const card = await createCategoryCard(category);
      categoriesGrid.appendChild(card);
    }
  } catch (error) {
    console.error("Error loading categories:", error);
    loadingSection.classList.add("hidden");
    categoriesGrid.innerHTML = `
      <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
        <p class="text-red-400">Errore nel caricamento delle categorie</p>
      </div>
    `;
  }
};

// Funzione per mostrare i prodotti di una categoria
const showCategoryProducts = async (category) => {
  const categoriesSection = document.getElementById("categories-section");
  const categoryProductsSection = document.getElementById(
    "category-products-section"
  );
  const categoryTitle = document.getElementById("category-title");
  const categoryCount = document.getElementById("category-count");
  const categoryProductsGrid = document.getElementById(
    "category-products-grid"
  );
  const noProductsMessage = document.getElementById("no-products-message");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  const loadingSection = document.getElementById("loading-section");

  try {
    // Mostra loading
    loadingSection.classList.remove("hidden");

    // Nasconde la sezione categorie e mostra quella prodotti
    categoriesSection.classList.add("hidden");
    categoryProductsSection.classList.remove("hidden");

    // Aggiorna breadcrumb per mostrare Home > Categorie > {categoria}
    updateBreadcrumbForCategory(category);

    // Carica i prodotti della categoria
    const products = await getSalesByCategory(category);

    // Carica le città nel filtro
    await loadCities();

    // Nasconde loading
    loadingSection.classList.add("hidden");

    // Aggiorna titolo e conteggio
    categoryTitle.textContent = category;
    updateProductCount(products.length);

    if (products.length === 0) {
      categoryProductsGrid.classList.add("hidden");
      noProductsMessage.classList.remove("hidden");
      return;
    }

    // Mostra i prodotti
    noProductsMessage.classList.add("hidden");
    categoryProductsGrid.classList.remove("hidden");
    categoryProductsGrid.innerHTML = "";

    // Ordina per data (più recenti prima)
    const sortedProducts = products.sort(
      (a, b) => new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
    );

    sortedProducts.forEach((product) => {
      const card = createProductCard(product);
      categoryProductsGrid.appendChild(card);
    });

    // Setup dell'ordinamento e filtri
    setupSorting(products);
    setupFilters(products);
  } catch (error) {
    console.error("Error loading category products:", error);
    loadingSection.classList.add("hidden");
    categoryProductsGrid.innerHTML = `
      <div class="col-span-full bg-slate-800 p-8 rounded-lg text-center">
        <p class="text-red-400">Errore nel caricamento dei prodotti</p>
      </div>
    `;
  }
};

// Funzione per caricare le città nel filtro
const loadCities = async () => {
  try {
    const cities = await getCities();
    const citySelect = document.getElementById("city-filter");

    if (citySelect) {
      // Aggiungi le opzioni delle città
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error loading cities:", error);
  }
};

// Funzione per filtrare i prodotti
const filterProducts = (products, filters) => {
  return products.filter((product) => {
    // Filtro per testo
    const textMatch =
      !filters.text ||
      product.titolo.toLowerCase().includes(filters.text.toLowerCase()) ||
      product.descrizione.toLowerCase().includes(filters.text.toLowerCase());

    // Filtro per città
    const cityMatch = !filters.city || product.citta === filters.city;

    return textMatch && cityMatch;
  });
};

// Funzione per ottenere i filtri correnti
const getCurrentFilters = () => {
  const searchInput = document.getElementById("search-input");
  const cityFilter = document.getElementById("city-filter");

  return {
    text: searchInput ? searchInput.value.trim() : "",
    city: cityFilter ? cityFilter.value : "",
  };
};

// Funzione per applicare i filtri e aggiornare la visualizzazione
const applyFilters = (allProducts) => {
  const filters = getCurrentFilters();
  const filteredProducts = filterProducts(allProducts, filters);

  // Applica anche l'ordinamento
  const sortBy = document.getElementById("sort-by").value;
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Aggiorna la griglia
  updateProductsGrid(sortedProducts);

  // Aggiorna il conteggio
  updateProductCount(filteredProducts.length);
};

// Funzione per aggiornare il conteggio dei prodotti
const updateProductCount = (count) => {
  const categoryCount = document.getElementById("category-count");
  if (categoryCount) {
    categoryCount.textContent = `${count} ${
      count === 1 ? "annuncio trovato" : "annunci trovati"
    }`;
  }
};

// Funzione per pulire i filtri
const clearFilters = () => {
  const searchInput = document.getElementById("search-input");
  const cityFilter = document.getElementById("city-filter");

  if (searchInput) searchInput.value = "";
  if (cityFilter) cityFilter.value = "";
};

// Funzione per gestire l'ordinamento dei prodotti
const setupSorting = (products) => {
  const sortSelect = document.getElementById("sort-by");

  // Rimuovi listener precedenti per evitare duplicati
  const newSortSelect = sortSelect.cloneNode(true);
  sortSelect.parentNode.replaceChild(newSortSelect, sortSelect);

  newSortSelect.addEventListener("change", () => {
    applyFilters(products);
  });
};

// Funzione per configurare i filtri
const setupFilters = (products) => {
  const searchInput = document.getElementById("search-input");
  const cityFilter = document.getElementById("city-filter");
  const clearButton = document.getElementById("clear-filters");

  // Setup search input con onchange
  if (searchInput) {
    // Rimuovi listener precedenti
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);

    newSearchInput.addEventListener("input", () => {
      applyFilters(products);
    });
  }

  // Setup city filter con onchange
  if (cityFilter) {
    // Rimuovi listener precedenti
    const newCityFilter = cityFilter.cloneNode(true);
    cityFilter.parentNode.replaceChild(newCityFilter, cityFilter);

    // Ricarica le opzioni delle città
    loadCities().then(() => {
      newCityFilter.addEventListener("change", () => {
        applyFilters(products);
      });
    });
  }

  // Setup clear filters button
  if (clearButton) {
    // Rimuovi listener precedenti
    const newClearButton = clearButton.cloneNode(true);
    clearButton.parentNode.replaceChild(newClearButton, clearButton);

    newClearButton.addEventListener("click", () => {
      clearFilters();
      applyFilters(products);
    });
  }
};

// Funzione per ordinare i prodotti
const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "date-desc":
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
      );
    case "date-asc":
      return sortedProducts.sort(
        (a, b) =>
          new Date(a.data_pubblicazione) - new Date(b.data_pubblicazione)
      );
    case "price-asc":
      return sortedProducts.sort((a, b) => a.prezzo - b.prezzo);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.prezzo - a.prezzo);
    default:
      return sortedProducts;
  }
};

// Funzione per aggiornare la griglia dei prodotti
const updateProductsGrid = (products) => {
  const categoryProductsGrid = document.getElementById(
    "category-products-grid"
  );
  const noProductsMessage = document.getElementById("no-products-message");

  categoryProductsGrid.innerHTML = "";

  if (products.length === 0) {
    categoryProductsGrid.classList.add("hidden");
    noProductsMessage.classList.remove("hidden");
    return;
  }

  noProductsMessage.classList.add("hidden");
  categoryProductsGrid.classList.remove("hidden");

  products.forEach((product) => {
    const card = createProductCard(product);
    categoryProductsGrid.appendChild(card);
  });
};

// Funzione per tornare alle categorie
const showCategories = () => {
  const categoriesSection = document.getElementById("categories-section");
  const categoryProductsSection = document.getElementById(
    "category-products-section"
  );

  // Mostra la sezione categorie e nasconde quella prodotti
  categoriesSection.classList.remove("hidden");
  categoryProductsSection.classList.add("hidden");

  // Ripristina breadcrumb
  resetBreadcrumb();

  // Rimuove il parametro category dall'URL
  const url = new URL(window.location);
  url.searchParams.delete("category");
  window.history.pushState({}, "", url);
};

// Funzione per gestire il routing basato su query string
const handleRouting = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (category) {
    showCategoryProducts(category);
  }
};

// Funzione per aggiornare il breadcrumb quando si visualizza una categoria
const updateBreadcrumbForCategory = (category) => {
  const breadcrumbContainer = document.querySelector(
    'nav[aria-label="Breadcrumb"] ol'
  );

  breadcrumbContainer.innerHTML = `
    <li class="inline-flex items-center">
      <a
        href="../index.html"
        class="inline-flex items-center text-sm font-medium text-slate-400 hover:text-red-500"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          ></path>
        </svg>
        Home
      </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <button
          id="breadcrumb-categories"
          class="ml-1 text-sm font-medium text-slate-400 hover:text-red-500 md:ml-2 cursor-pointer"
        >
          Categorie
        </button>
      </div>
    </li>
    <li>
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span
          class="ml-1 text-sm font-medium text-white md:ml-2"
          id="breadcrumb-current"
        >${category}</span>
      </div>
    </li>
  `;

  // Aggiunge event listener per il click su "Categorie" nel breadcrumb
  const breadcrumbCategoriesBtn = document.getElementById(
    "breadcrumb-categories"
  );
  if (breadcrumbCategoriesBtn) {
    breadcrumbCategoriesBtn.addEventListener("click", showCategories);
  }
};

// Funzione per ripristinare il breadcrumb originale
const resetBreadcrumb = () => {
  const breadcrumbContainer = document.querySelector(
    'nav[aria-label="Breadcrumb"] ol'
  );

  breadcrumbContainer.innerHTML = `
    <li class="inline-flex items-center">
      <a
        href="../index.html"
        class="inline-flex items-center text-sm font-medium text-slate-400 hover:text-red-500"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          ></path>
        </svg>
        Home
      </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span
          class="ml-1 text-sm font-medium text-white md:ml-2"
          id="breadcrumb-current"
        >Categorie</span>
      </div>
    </li>
  `;
};

// Inizializzazione quando il DOM è caricato
document.addEventListener("DOMContentLoaded", () => {
  // Carica le categorie inizialmente
  loadCategories();

  // Gestisce il routing basato su query string
  handleRouting();

  // Setup del pulsante "Torna alle categorie"
  const backButton = document.getElementById("back-to-categories");
  if (backButton) {
    backButton.addEventListener("click", showCategories);
  }

  // Gestisce il back button del browser
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.category) {
      showCategoryProducts(event.state.category);
    } else {
      showCategories();
    }
  });
});
