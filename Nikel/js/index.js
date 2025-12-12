const myModal = new bootstrap.Modal("#register-modal");

// CORRIGIDO: sessionStorage
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

if (session) {
    logged = session;
}

// LOGAR NO SISTEMA
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Opss! Verifique o usuário ou a senha.");
        return;
    }

    if (account.password !== password) {
        alert("Opss! Verifique o usuário ou a senha.");
        return;
    }

    saveSession(email, checkSession);
    window.location.href = "home.html";
});

// CADASTRAR
document.getElementById("create-form-register").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input-register").value;
    const password = document.getElementById("password-create-input-register").value;

    if (email.length < 5) {
        alert("Preencha o campo com um email válido.");
        return;
    }

    if (password.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres. Deve ter letras maiúsculas, minúsculas, números e caracteres especiais.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Cadastro realizado com sucesso!");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

// CORRIGIDO: nome do parâmetro
function saveSession(data, persist) {
    if (persist) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) {
        return JSON.parse(account);
    }

    return "";
}
