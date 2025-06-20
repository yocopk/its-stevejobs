const isAuth = () => {
  try {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      return user.isLogged === true;
    }
    return false;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

const checkPath = () => {
  const path = window.location.pathname;
  const isAuthenticated = isAuth();

  // Gestisci i percorsi relativi per le pagine nella cartella pages
  const currentPage = path.split("/").pop() || "index.html";

  // Reindirizza alla login se l'utente non è autenticato e sta cercando di accedere al profilo
  if (currentPage === "profile.html" && !isAuthenticated) {
    window.location.href = "login.html";
    return;
  }

  // Reindirizza al profilo se l'utente è già autenticato e sta sulla pagina di login/register
  if (
    (currentPage === "login.html" || currentPage === "register.html") &&
    isAuthenticated
  ) {
    window.location.href = "profile.html";
    return;
  }
};

// Funzione per inizializzare il middleware
const initMiddleware = () => {
  // Esegui il controllo iniziale
  checkPath();

  // Aggiungi un listener per i cambiamenti nello storage (per sincronizzare tra le schede)
  window.addEventListener("storage", (e) => {
    if (e.key === "loggedUser") {
      checkPath();
    }
  });
};

// Esporta le funzioni
window.AuthMiddleware = {
  isAuth,
  checkPath,
  initMiddleware,
};
