function validateForm(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    let nomeRegex = /^[A-Za-zÀ-ÿ' -]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nomeRegex.test(nome)) {
        alert("Il nome non è valido. Inserisci solo lettere e spazi.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("L'email non è valida.");
        return;
    }

    document.getElementById("userForm").submit();
}
