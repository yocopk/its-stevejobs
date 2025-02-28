// File: script.js

/**
 * Funzione per modificare un utente
 */
function editUser(id) {
    fetch(`get_user.php?id=${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('nome').value = user.nome;
            document.getElementById('email').value = user.email;
            document.getElementById('telefono').value = user.telefono;
            document.querySelector('button[name="add"]').classList.add('d-none');
            document.querySelector('button[name="update"]').classList.remove('d-none');
        });
}

/**
 * Controlli di input con espressioni regolari
 */
document.getElementById('userForm').addEventListener('submit', function (e) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    if (!/^[a-zA-Z\s]{2,}$/.test(nome)) {
        alert('Nome non valido!');
        e.preventDefault();
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email non valida!');
        e.preventDefault();
    }

    if (!/^\d{10}$/.test(telefono)) {
        alert('Telefono non valido! Deve contenere 10 numeri.');
        e.preventDefault();
    }
});