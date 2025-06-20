// === FUNZIONI DI VALIDAZIONE ===
function validateEmail(email) {
  if (!email) return "L'email è obbligatoria";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Inserisci un'email valida";
  return null;
}

function validateEmailOrUsername(input) {
  if (!input) return "Email o Username obbligatorio";

  // Se contiene @, valida come email
  if (input.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) return "Inserisci un'email valida";
  } else {
    // Altrimenti valida come username
    if (input.length < 3) return "L'username deve essere di almeno 3 caratteri";
    if (!/^[a-zA-Z0-9_]+$/.test(input)) {
      return "L'username può contenere solo lettere, numeri e underscore";
    }
  }

  return null;
}

function validatePassword(password) {
  if (!password) return "La password è obbligatoria";
  if (password.length < 6)
    return "La password deve essere di almeno 6 caratteri";
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return "La password deve contenere maiuscola, minuscola e numero";
  }
  return null;
}

function validateName(name) {
  if (!name) return "Il nome è obbligatorio";
  if (name.length < 2) return "Il nome deve essere di almeno 2 caratteri";
  return null;
}

function validateUsername(username) {
  if (!username) return "L'username è obbligatorio";
  if (username.length < 3)
    return "L'username deve essere di almeno 3 caratteri";
  if (username.length > 20) return "L'username non può superare i 20 caratteri";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "L'username può contenere solo lettere, numeri e underscore";
  }
  return null;
}

function validatePasswordMatch(password, confirmPassword) {
  if (!confirmPassword) return "Conferma la password";
  if (password !== confirmPassword) return "Le password non corrispondono";
  return null;
}

// === TOGGLE PASSWORD VISIBILITY ===
function initPasswordToggle() {
  // Toggle per il campo password principale
  const togglePassword = document.getElementById("toggle-password");
  const passwordField = document.getElementById("password");

  if (togglePassword && passwordField) {
    togglePassword.addEventListener("click", function () {
      const isPassword = passwordField.type === "password";
      passwordField.type = isPassword ? "text" : "password";

      // Toggle icone per login
      const eyeOpen = document.getElementById("eye-open");
      const eyeClosed = document.getElementById("eye-closed");

      // Toggle icone per register (password)
      const eyeOpenPassword = document.getElementById("eye-open-password");
      const eyeClosedPassword = document.getElementById("eye-closed-password");

      if (eyeOpen && eyeClosed) {
        // Login page
        eyeOpen.classList.toggle("hidden");
        eyeClosed.classList.toggle("hidden");
      } else if (eyeOpenPassword && eyeClosedPassword) {
        // Register page - password field
        eyeOpenPassword.classList.toggle("hidden");
        eyeClosedPassword.classList.toggle("hidden");
      }
    });
  }

  // Toggle per il campo conferma password (solo register)
  const toggleConfirmPassword = document.getElementById(
    "toggle-confirm-password"
  );
  const confirmPasswordField = document.getElementById("confirm-password");

  if (toggleConfirmPassword && confirmPasswordField) {
    toggleConfirmPassword.addEventListener("click", function () {
      const isPassword = confirmPasswordField.type === "password";
      confirmPasswordField.type = isPassword ? "text" : "password";

      const eyeOpenConfirm = document.getElementById("eye-open-confirm");
      const eyeClosedConfirm = document.getElementById("eye-closed-confirm");

      if (eyeOpenConfirm && eyeClosedConfirm) {
        eyeOpenConfirm.classList.toggle("hidden");
        eyeClosedConfirm.classList.toggle("hidden");
      }
    });
  }
}

// === GESTIONE ERRORI ===
function showError(fieldId, message) {
  clearError(fieldId);

  const field = document.getElementById(fieldId);
  if (!field) return;

  // Styling errore
  field.classList.add("border-red-500");
  field.classList.remove("border-slate-600");

  // Messaggio errore
  const errorDiv = document.createElement("div");
  errorDiv.className = "text-red-400 text-sm mt-1";
  errorDiv.id = `${fieldId}-error`;
  errorDiv.textContent = message;

  field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.remove("border-red-500");
    field.classList.add("border-slate-600");
  }

  const errorDiv = document.getElementById(`${fieldId}-error`);
  if (errorDiv) errorDiv.remove();
}

function showMessage(message, isSuccess = false) {
  clearMessage();

  const container = document.getElementById("form-container");
  if (!container) return;

  const messageDiv = document.createElement("div");
  messageDiv.id = "form-message";
  messageDiv.className = `px-4 py-3 rounded mb-4 ${
    isSuccess
      ? "bg-green-100 border border-green-400 text-green-700"
      : "bg-red-100 border border-red-400 text-red-700"
  }`;
  messageDiv.textContent = message;

  container.insertBefore(messageDiv, container.firstChild);
}

function clearMessage() {
  const existing = document.getElementById("form-message");
  if (existing) existing.remove();
}

// === GESTIONE AUTENTICAZIONE ===
async function loginUser(emailOrUsername, password) {
  // Piccola pausa per UX
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Ottieni gli utenti registrati
  const registeredUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  // Utenti di default con password
  const defaultCredentials = [
    {
      email: "demo@example.com",
      password: "Test123!",
      username: "demo",
      fullName: "demo user",
    },
  ];

  // Combina utenti di default e registrati
  const allUsers = [...defaultCredentials, ...registeredUsers];

  // Verifica email/username e password
  const user = allUsers.find(
    (u) =>
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
      u.password === password
  );

  if (!user) {
    throw new Error("Email/Username o password non corretti");
  }

  // Crea un oggetto utente completo per il localStorage
  const loggedUser = {
    isLogged: true,
    email: user.email,
    username: user.username || "",
    fullName: user.fullName || "",
  };

  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
}

async function registerUser(email, username, password, fullName) {
  // Piccola pausa per UX
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Ottieni gli utenti esistenti dal localStorage
  const existingUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  // Aggiungi utenti di default se non esistono
  const defaultUsers = [
    {
      email: "admin@marketdeal.it",
      username: "admin",
      fullName: "administrator",
    },
    {
      email: "existing@example.com",
      username: "existing_user",
      fullName: "existing user",
    },
  ];

  const allUsers = [...defaultUsers, ...existingUsers];

  // Controlla se email o username esistono già
  if (allUsers.some((user) => user.email === email)) {
    throw new Error("Email già registrata");
  }

  if (allUsers.some((user) => user.username === username)) {
    throw new Error("Username già in uso");
  }

  // Salva il nuovo utente con password e nome completo in lowercase
  const newUser = {
    email,
    username,
    password,
    fullName: fullName.toLowerCase(),
  };
  existingUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
}

// === GESTIONE FORM LOGIN ===
function handleLoginForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();

    const emailOrUsername = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validazione
    let hasErrors = false;

    const emailOrUsernameError = validateEmailOrUsername(emailOrUsername);
    if (emailOrUsernameError) {
      showError("email", emailOrUsernameError);
      hasErrors = true;
    } else {
      clearError("email");
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showError("password", passwordError);
      hasErrors = true;
    } else {
      clearError("password");
    }

    if (hasErrors) {
      showMessage("Correggi gli errori nel form");
      return;
    }

    // Submit
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Accedendo...";

    try {
      await loginUser(emailOrUsername, password);
      showMessage("Login effettuato con successo!", true);

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    } catch (error) {
      showMessage(error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// === GESTIONE FORM REGISTRAZIONE ===
function handleRegisterForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const terms = document.getElementById("terms").checked;

    // Validazione
    let hasErrors = false;

    const nameError = validateName(name);
    if (nameError) {
      showError("name", nameError);
      hasErrors = true;
    } else {
      clearError("name");
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      showError("username", usernameError);
      hasErrors = true;
    } else {
      clearError("username");
    }

    const emailError = validateEmail(email);
    if (emailError) {
      showError("email", emailError);
      hasErrors = true;
    } else {
      clearError("email");
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showError("password", passwordError);
      hasErrors = true;
    } else {
      clearError("password");
    }

    const confirmError = validatePasswordMatch(password, confirmPassword);
    if (confirmError) {
      showError("confirm-password", confirmError);
      hasErrors = true;
    } else {
      clearError("confirm-password");
    }

    if (!terms) {
      showMessage("Devi accettare i termini di servizio");
      hasErrors = true;
    }

    if (hasErrors) {
      showMessage("Correggi gli errori nel form");
      return;
    }

    // Submit
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando...";

    try {
      await registerUser(email, username, password, name);
      showMessage("Registrazione completata con successo!", true);

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch (error) {
      showMessage(error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// === INIZIALIZZAZIONE ===
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes("login.html")) {
    handleLoginForm();
  } else if (currentPage.includes("register.html")) {
    handleRegisterForm();
  }

  initPasswordToggle();
});

// === VALIDAZIONE FORM ANNUNCI ===
function validateAdTitle(title) {
  if (!title) return "Il titolo è obbligatorio";
  if (title.length < 3) return "Il titolo deve essere di almeno 3 caratteri";
  if (title.length > 100) return "Il titolo non può superare i 100 caratteri";
  return null;
}

function validateAdDescription(description) {
  if (!description) return "La descrizione è obbligatoria";
  if (description.length < 10)
    return "La descrizione deve essere di almeno 10 caratteri";
  if (description.length > 1000)
    return "La descrizione non può superare i 1000 caratteri";
  return null;
}

function validateAdPrice(price) {
  if (!price && price !== 0) return "Il prezzo è obbligatorio";
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return "Inserisci un prezzo valido";
  if (numPrice < 0) return "Il prezzo non può essere negativo";
  if (numPrice > 999999) return "Il prezzo è troppo alto";
  return null;
}

function validateAdCity(city) {
  if (!city) return "La città è obbligatoria";
  return null;
}

function validateAdCategory(category) {
  if (!category) return "La categoria è obbligatoria";
  return null;
}

// Setup validazione per form annunci
function setupAdFormValidation(form) {
  if (!form) return;

  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    field.addEventListener("blur", () => validateAdField(field));
    field.addEventListener("input", () => clearAdFieldError(field));
  });

  // Validazione prezzo
  const priceField = form.querySelector("#ad-price");
  if (priceField) {
    priceField.addEventListener("input", () => {
      const value = parseFloat(priceField.value);
      if (value < 0) {
        priceField.value = 0;
      }
    });
  }
}

// Valida un singolo campo del form annunci
function validateAdField(field) {
  const value = field.value.trim();
  let error = null;

  switch (field.id) {
    case "ad-title":
      error = validateAdTitle(value);
      break;
    case "ad-description":
      error = validateAdDescription(value);
      break;
    case "ad-price":
      error = validateAdPrice(value);
      break;
    case "ad-city":
      error = validateAdCity(value);
      break;
    case "ad-category":
      error = validateAdCategory(value);
      break;
    default:
      if (field.hasAttribute("required") && !value) {
        error = "Questo campo è obbligatorio";
      }
  }

  if (error) {
    setAdFieldError(field, error);
    return false;
  } else {
    setAdFieldSuccess(field);
    return true;
  }
}

// Valida tutto il form annunci
function validateAdForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateAdField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// Gestione errori per campi annunci
function setAdFieldError(field, message) {
  field.classList.add("form-error");
  field.classList.remove("form-success");

  // Rimuovi messaggio di errore esistente
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Aggiungi nuovo messaggio di errore
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-400 text-sm mt-1";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function setAdFieldSuccess(field) {
  field.classList.remove("form-error");
  field.classList.add("form-success");

  // Rimuovi messaggio di errore
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

function clearAdFieldError(field) {
  field.classList.remove("form-error", "form-success");

  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

// === FUNZIONI UTILITÀ PER UTENTE LOGGATO ===
function getLoggedUser() {
  const userData = localStorage.getItem("loggedUser");
  return userData ? JSON.parse(userData) : null;
}

function isUserLogged() {
  const user = getLoggedUser();
  return user && user.isLogged;
}

function logoutUser() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}

// Funzione per gestire il logout dal profilo utente
function handleLogout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "../index.html";
}

// Esporta le funzioni (se supportato dai browser)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateAdTitle,
    validateAdDescription,
    validateAdPrice,
    validateAdCity,
    validateAdCategory,
    setupAdFormValidation,
    validateAdForm,
    validateAdField,
    setAdFieldError,
    setAdFieldSuccess,
    clearAdFieldError,
    getLoggedUser,
    isUserLogged,
    logoutUser,
    handleLogout,
  };
}

// Rendi le funzioni disponibili globalmente
window.FormValidation = {
  // Validazione annunci
  validateAdTitle,
  validateAdDescription,
  validateAdPrice,
  validateAdCity,
  validateAdCategory,
  setupAdFormValidation,
  validateAdForm,
  validateAdField,
  setAdFieldError,
  setAdFieldSuccess,
  clearAdFieldError,

  // Gestione utenti
  getLoggedUser,
  isUserLogged,
  logoutUser,
  handleLogout,

  // Autenticazione
  loginUser,
  registerUser,

  // Validazione form
  validateEmail,
  validateEmailOrUsername,
  validatePassword,
  validateName,
  validateUsername,
  validatePasswordMatch,
};

// Rendi handleLogout disponibile anche come funzione globale
window.handleLogout = handleLogout;
