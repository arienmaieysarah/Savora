
// =========================================
// SAVORA - LOGIN SYSTEM
// =========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const correctEmail = "admin@savora.com";
        const correctPassword = "123456";

        if (email === correctEmail && password === correctPassword) {

            localStorage.setItem("savoraLoggedIn", "true");
            localStorage.setItem("savoraUser", email);

            alert("Welcome to Savora! Login Successful.");

            window.location.replace("./home.html");

        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
}

// =========================================
// PROTECT SAVORA PAGES
// =========================================

const protectedPages = [
    "home.html",
    "dashboard.html",
    "recipes.html",
    "categories.html",
    "favourites.html",
    "reports.html"
];

const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (
    protectedPages.includes(currentPage) &&
    localStorage.getItem("savoraLoggedIn") !== "true"
) {
    window.location.replace("./index.html");
}

// =========================================
// LOG OUT
// =========================================

const logoutButtons = document.querySelectorAll(".sidebar-logout");

logoutButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        localStorage.removeItem("savoraLoggedIn");
        localStorage.removeItem("savoraUser");

        window.location.replace("./index.html");
    });
});
