
/* =========================================
   SAVORA - DASHBOARD RECIPE STATISTICS
========================================= */

// CATEGORY DATA
const categoryNames = [
    "Main Course",
    "Dessert",
    "Italian Cuisine",
    "Korean Cuisine",
    "Bakery",
    "Drinks"
];

// DEFAULT RECIPE DATA
const defaultCategoryCounts = [1, 4, 2, 1, 1, 3];

// READ RECIPE DATA
let recipes = [];

try {
    const storedRecipes = JSON.parse(
        localStorage.getItem("savoraRecipes")
    );

    recipes = Array.isArray(storedRecipes) && storedRecipes.length > 0
        ? storedRecipes
        : [];
} catch (error) {
    recipes = [];
}

// COUNT RECIPES BY CATEGORY
const categoryCounts = recipes.length > 0
    ? categoryNames.map(category =>
        recipes.filter(recipe =>
            (recipe.category || "").trim().toLowerCase() ===
            category.toLowerCase()
        ).length
    )
    : defaultCategoryCounts;

// CHART COLOURS
const chartColours = [
    "#24150F",
    "#38251B",
    "#765039",
    "#A87955",
    "#B99A7B",
    "#C5A788"
];

// GET CHART CANVAS
const chartCanvas = document.getElementById("recipeChart");

// CREATE RECIPE STATISTICS CHART
if (chartCanvas && typeof Chart !== "undefined") {

    new Chart(chartCanvas, {

        type: "bar",

        data: {
            labels: categoryNames,

            datasets: [{
                label: "Number of Recipes",
                data: categoryCounts,
                backgroundColor: chartColours,
                borderRadius: 8,
                barThickness: 35
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    enabled: true
                }

            },

            scales: {

                y: {
                    beginAtZero: true,

                    ticks: {
                        stepSize: 1,
                        color: "#765039"
                    },

                    grid: {
                        color: "#E5D5C3"
                    }
                },

                x: {
                    ticks: {
                        color: "#765039"
                    },

                    grid: {
                        display: false
                    }
                }

            }

        }

    });

}

// =========================================
// SAVORA - AUTOMATIC GREETING
// =========================================

const greetingElement = document.querySelector(
    ".dashboard-header h4"
);

if (greetingElement) {

    const currentHour = new Date().getHours();

    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning!";
    }
    else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon!";
    }
    else {
        greeting = "Good Evening!";
    }

    greetingElement.textContent = greeting;
}

console.log("Savora Dashboard loaded successfully.");
