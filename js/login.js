/* =====================================================
   CodeSphere Authentication
   Frontend prototype version
   ===================================================== */

const DEMO_USER = {
    username: "demo1",
    email: "demo1@gmail.com",
    password: "Demo@123"
};

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("codeSphereUsers"));
        return Array.isArray(users) ? users : [];
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("codeSphereUsers", JSON.stringify(users));
}

function initializeUsers() {
    const users = getUsers();

    const demoExists = users.some(function (user) {
        return String(user.username || "").toLowerCase() === DEMO_USER.username;
    });

    if (!demoExists) {
        users.push(DEMO_USER);
        saveUsers(users);
    }
}

initializeUsers();

/* =====================================================
   ELEMENTS
   ===================================================== */

const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const loginError = document.getElementById("loginError");

const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const signupError = document.getElementById("signupError");
const signupSuccess = document.getElementById("signupSuccess");

/* =====================================================
   HELPERS
   ===================================================== */

function clearElement(element) {
    if (element) element.textContent = "";
}

function clearLoginMessages() {
    clearElement(loginError);
    if (loginError) loginError.classList.remove("show");
}

function clearSignupMessages() {
    [
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError,
        signupError,
        signupSuccess
    ].forEach(clearElement);

    if (signupError) signupError.classList.remove("show");
    if (signupSuccess) signupSuccess.classList.remove("show");
}

function showError(element, message) {
    if (element) element.textContent = message;
}

function validateEmail(email) {
    if (!email) return "Email is required.";

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        return "Please enter a valid email address.";
    }

    return "";
}

function validateUsername(username) {
    if (!username) return "Username is required.";

    if (username.length < 3) {
        return "Username must contain at least 3 characters.";
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
        return "Username can contain letters, numbers, _, . and - only.";
    }

    return "";
}

function validatePassword(password) {
    if (!password) return "Password is required.";

    if (password.length < 8) {
        return "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password needs an uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
        return "Password needs a lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
        return "Password needs a number.";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password needs a special character.";
    }

    return "";
}

function setupPasswordToggle(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (!input || !button) return;

    button.addEventListener("click", function () {
        const showing = input.type === "text";

        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
    });
}

/* =====================================================
   PASSWORD TOGGLES
   ===================================================== */

setupPasswordToggle("loginPassword", "loginPasswordToggle");
setupPasswordToggle("signupPassword", "signupPasswordToggle");
setupPasswordToggle("signupConfirmPassword", "confirmPasswordToggle");

/* =====================================================
   LOGIN / SIGNUP SWITCH
   ===================================================== */

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

if (showSignup) {
    showSignup.addEventListener("click", function () {
        loginSection.classList.add("hidden");
        signupSection.classList.remove("hidden");

        clearLoginMessages();
        clearSignupMessages();

        if (signupForm) signupForm.reset();

        signupUsername.focus();
    });
}

if (showLogin) {
    showLogin.addEventListener("click", function () {
        signupSection.classList.add("hidden");
        loginSection.classList.remove("hidden");

        clearLoginMessages();
        clearSignupMessages();

        if (signupForm) signupForm.reset();

        loginUsername.focus();
    });
}

/* =====================================================
   LOGIN
   ===================================================== */

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearLoginMessages();

        const identifier = loginUsername.value.trim().toLowerCase();
        const password = loginPassword.value;

        if (!identifier) {
            showError(loginError, "Please enter your username or email.");
            loginError.classList.add("show");
            loginUsername.focus();
            return;
        }

        if (!password) {
            showError(loginError, "Please enter your password.");
            loginError.classList.add("show");
            loginPassword.focus();
            return;
        }

        const users = getUsers();

        const user = users.find(function (currentUser) {
            const username = String(currentUser.username || "").toLowerCase();
            const email = String(currentUser.email || "").toLowerCase();

            return identifier === username || identifier === email;
        });

        if (!user || user.password !== password) {
            showError(loginError, "Invalid username/email or password.");
            loginError.classList.add("show");

            loginPassword.value = "";
            loginPassword.focus();
            return;
        }

        const loginButton = loginForm.querySelector('button[type="submit"]');

        if (loginButton) {
            loginButton.disabled = true;
            loginButton.textContent = "Signing in...";
        }

        const session = {
            authenticated: true,
            username: user.username || user.email,
            email: user.email || "",
            loginTime: new Date().toISOString()
        };

        localStorage.setItem("userSession", JSON.stringify(session));

        window.location.href = "dashboard.html";
    });
}

/* =====================================================
   SIGNUP
   ===================================================== */

if (signupPassword) {
    signupPassword.addEventListener("input", function () {
        const message = validatePassword(signupPassword.value);
        showError(passwordError, message);
    });
}

if (signupConfirmPassword) {
    signupConfirmPassword.addEventListener("input", function () {
        if (signupConfirmPassword.value !== signupPassword.value) {
            showError(confirmPasswordError, "Passwords do not match.");
        } else {
            clearElement(confirmPasswordError);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearSignupMessages();

        const username = signupUsername.value.trim();
        const email = signupEmail.value.trim().toLowerCase();
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;

        let hasError = false;

        const usernameMessage = validateUsername(username);
        if (usernameMessage) {
            showError(usernameError, usernameMessage);
            hasError = true;
        }

        const emailMessage = validateEmail(email);
        if (emailMessage) {
            showError(emailError, emailMessage);
            hasError = true;
        }

        const passwordMessage = validatePassword(password);
        if (passwordMessage) {
            showError(passwordError, passwordMessage);
            hasError = true;
        }

        if (password !== confirmPassword) {
            showError(confirmPasswordError, "Passwords do not match.");
            hasError = true;
        }

        if (hasError) return;

        const users = getUsers();

        const usernameExists = users.some(function (user) {
            return String(user.username || "").toLowerCase() === username.toLowerCase();
        });

        if (usernameExists) {
            showError(signupError, "That username is already registered.");
            signupError.classList.add("show");
            return;
        }

        const emailExists = users.some(function (user) {
            return String(user.email || "").toLowerCase() === email;
        });

        if (emailExists) {
            showError(signupError, "That email is already registered.");
            signupError.classList.add("show");
            return;
        }

        users.push({
            username: username,
            email: email,
            password: password
        });

        saveUsers(users);

        showError(signupSuccess, "Account created successfully. You can now log in.");
        signupSuccess.classList.add("show");

        signupForm.reset();

        setTimeout(function () {
            signupSection.classList.add("hidden");
            loginSection.classList.remove("hidden");

            loginUsername.value = username;
            loginPassword.focus();

            clearSignupMessages();
        }, 1000);
    });
}
