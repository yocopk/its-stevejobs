// Path Helper - Gestisce i percorsi corretti per la navigazione

// Ottieni la pagina corrente
export function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("login")) return "login";
  if (path.includes("register")) return "register";
  if (path.includes("categories")) return "categories";
  if (path.includes("product-detail")) return "product-detail";
  if (path.includes("profile")) return "profile";
  if (path.includes("index") || path === "/" || path.endsWith("/"))
    return "home";
  return "other";
}

// Determina se siamo nella home page
export function isHomePage() {
  const currentPath = window.location.pathname;
  return (
    currentPath.includes("index") ||
    currentPath === "/" ||
    currentPath.endsWith("/")
  );
}

// Ottieni il percorso corretto per la navigazione
export function getNavigationPath(page) {
  const currentPage = getCurrentPage();
  const isHome = isHomePage();

  const paths = {
    home: {
      fromHome: "#",
      fromOther: "../index.html",
    },
    login: {
      fromHome: "pages/login.html",
      fromOther: "login.html",
    },
    register: {
      fromHome: "pages/register.html",
      fromOther: "register.html",
    },
    categories: {
      fromHome: "pages/categories.html",
      fromOther: "categories.html",
    },
    profile: {
      fromHome: "pages/profile.html",
      fromOther: "profile.html",
    },
    "product-detail": {
      fromHome: "pages/product-detail.html",
      fromOther: "product-detail.html",
    },
  };

  // Se la pagina richiesta è quella corrente, restituisci #
  if (currentPage === page) {
    return "#";
  }

  // Altrimenti, restituisci il percorso appropriato
  const pageConfig = paths[page];
  if (!pageConfig) {
    console.warn(`Percorso non configurato per la pagina: ${page}`);
    return "#";
  }

  return isHome ? pageConfig.fromHome : pageConfig.fromOther;
}
