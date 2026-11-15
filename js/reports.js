
/* =========================================
   SAVORA - RECIPE REPORTS & ANALYTICS
========================================= */

const RECIPES_KEY = "savoraRecipes";
const FAVOURITES_KEY = "savoraFavourites";

// ORIGINAL RECIPE DATA
const defaultRecipes = [
    { name: "Creamy Pasta", category: "Italian Cuisine", image: "assets/pasta.jpeg" },
    { name: "Grilled Chicken", category: "Main Course", image: "assets/chicken.jpeg" },
    { name: "Chocolate Cake", category: "Dessert", image: "assets/cake.jpeg" },
    { name: "Rose Tteokbokki", category: "Korean Cuisine", image: "assets/rose-tteokbokki.jpeg" },
    { name: "Bolognese Pasta", category: "Italian Cuisine", image: "assets/bolognese.jpeg" },
    { name: "Caramel Pudding", category: "Dessert", image: "assets/caramel-pudding.jpeg" },
    { name: "Garlic Cream Cheese Bread", category: "Bakery", image: "assets/garlic-bread.jpeg" },
    { name: "Burnt Cheesecake", category: "Dessert", image: "assets/burnt-cheesecake.jpeg" },
    { name: "Strawberry Smoothie", category: "Drinks", image: "assets/strawberry-smoothie.jpeg" },
    { name: "Strawberry Sparkling", category: "Drinks", image: "assets/strawberry-sparkling.jpeg" },
    { name: "Velvet Latte", category: "Drinks", image: "assets/velvet-latte.jpeg" },
    { name: "Strawberry Cheesecake", category: "Dessert", image: "assets/cheesecake.jpeg" }
];

// READ LOCAL STORAGE
function readStorage(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

let recipes = readStorage(RECIPES_KEY);
const favourites = readStorage(FAVOURITES_KEY);

// Use original recipes if storage is empty
if (recipes.length === 0) {
    recipes = defaultRecipes;
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

// CATEGORY DATA
const categoryNames = [
    "Main Course",
    "Dessert",
    "Italian Cuisine",
    "Korean Cuisine",
    "Bakery",
    "Drinks"
];

const categoryCounts = categoryNames.map(category =>
    recipes.filter(recipe =>
        (recipe.category || "").trim().toLowerCase() ===
        category.toLowerCase()
    ).length
);

const actualCategories = new Set(
    recipes.map(recipe => (recipe.category || "").trim()).filter(Boolean)
);

// FAVOURITES
const validFavourites = favourites.filter(name =>
    recipes.some(recipe => recipe.name === name)
);

// STATISTICS
document.getElementById("reportTotalRecipes").textContent = recipes.length;
document.getElementById("reportTotalCategories").textContent = actualCategories.size;
document.getElementById("reportAvailableRecipes").textContent = recipes.length;
document.getElementById("reportTotalFavourites").textContent = validFavourites.length;
document.getElementById("reportFavouriteNumber").textContent = validFavourites.length;

// CHART COLOURS
const chartColours = [
    "#24150F",
    "#38251B",
    "#765039",
    "#A87955",
    "#B99A7B",
    "#C5A788"
];

// BAR CHART
const barCanvas = document.getElementById("reportBarChart");

if (barCanvas && typeof Chart !== "undefined") {
    new Chart(barCanvas, {
        type: "bar",
        data: {
            labels: categoryNames,
            datasets: [{
                label: "Number of Recipes",
                data: categoryCounts,
                backgroundColor: chartColours,
                borderRadius: 8,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0, color: "#765039" },
                    grid: { color: "#E5D5C3" }
                },
                x: {
                    ticks: { color: "#765039" },
                    grid: { display: false }
                }
            }
        }
    });
}

// DOUGHNUT CHART
const pieCanvas = document.getElementById("reportPieChart");

if (pieCanvas && typeof Chart !== "undefined") {
    new Chart(pieCanvas, {
        type: "doughnut",
        data: {
            labels: categoryNames,
            datasets: [{
                data: categoryCounts,
                backgroundColor: chartColours,
                borderWidth: 3,
                borderColor: "#FFFCF7"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#765039",
                        padding: 18,
                        usePointStyle: true
                    }
                }
            },
            cutout: "60%"
        }
    });
}

// RECIPE COLLECTION TABLE
const recentRecipeTable = document.getElementById("reportRecentRecipes");

if (recentRecipeTable) {
    recentRecipeTable.innerHTML = "";

    recipes.slice(-5).reverse().forEach(recipe => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = recipe.name || "Untitled Recipe";

        const categoryCell = document.createElement("td");
        categoryCell.textContent = recipe.category || "Uncategorized";

        const statusCell = document.createElement("td");
        statusCell.textContent = "Available";
        statusCell.className = "report-status";

        row.append(nameCell, categoryCell, statusCell);
        recentRecipeTable.appendChild(row);
    });
}

// FAVOURITE SUMMARY
const favouriteMessage = document.getElementById("reportFavouriteMessage");

if (favouriteMessage) {
    favouriteMessage.textContent = validFavourites.length === 0
        ? "You have not added any favourite recipes yet."
        : `You have saved ${validFavourites.length} favourite recipes: ${validFavourites.join(", ")}.`;
}

console.log("Savora Reports loaded successfully.");
