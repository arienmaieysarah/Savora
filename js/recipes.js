
/* =========================================
   SAVORA - RECIPE MANAGEMENT SYSTEM
========================================= */

const RECIPES_KEY = "savoraRecipes";
const FAVOURITES_KEY = "savoraFavourites";

const recipeList = document.getElementById("recipeList");
const saveRecipeBtn = document.getElementById("saveRecipeBtn");

const searchRecipe = document.getElementById("searchRecipe");
const filterCategory = document.getElementById("filterCategory");
const recipeCount = document.getElementById("recipeCount");
const sortRecipes = document.getElementById("sortRecipes");

const defaultRecipes = [
    { name: "Creamy Pasta", category: "Italian Cuisine", image: "./assets/pasta.jpeg" },
    { name: "Grilled Chicken", category: "Main Course", image: "./assets/chicken.jpeg" },
    { name: "Chocolate Cake", category: "Dessert", image: "./assets/cake.jpeg" },
    { name: "Rose Tteokbokki", category: "Korean Cuisine", image: "./assets/rose-tteokbokki.jpeg" },
    { name: "Bolognese Pasta", category: "Italian Cuisine", image: "./assets/bolognese.jpeg" },
    { name: "Caramel Pudding", category: "Dessert", image: "./assets/caramel-pudding.jpeg" },
    { name: "Garlic Cream Cheese Bread", category: "Bakery", image: "./assets/garlic-bread.jpeg" },
    { name: "Burnt Cheesecake", category: "Dessert", image: "./assets/burnt-cheesecake.jpeg" },
    { name: "Strawberry Smoothie", category: "Drinks", image: "./assets/strawberry-smoothie.jpeg" },
    { name: "Strawberry Sparkling", category: "Drinks", image: "./assets/strawberry-sparkling.jpeg" },
    { name: "Velvet Latte", category: "Drinks", image: "./assets/velvet-latte.jpeg" },
    { name: "Strawberry Cheesecake", category: "Dessert", image: "./assets/cheesecake.jpeg" }
];

// =========================================
// LOCAL STORAGE
// =========================================

function getStoredRecipes() {
    try {
        const data = JSON.parse(localStorage.getItem(RECIPES_KEY));
        return Array.isArray(data) ? data : defaultRecipes;
    } catch (error) {
        return defaultRecipes;
    }
}

function saveStoredRecipes(recipes) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

function getFavourites() {
    try {
        const data = JSON.parse(localStorage.getItem(FAVOURITES_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function saveFavourites(favourites) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

// Initialise storage only if it does not exist
if (localStorage.getItem(RECIPES_KEY) === null) {
    saveStoredRecipes(defaultRecipes);
}

// =========================================
// RECIPE CARD
// =========================================

function createRecipeCard(recipe) {

    const wrapper = document.createElement("div");
    wrapper.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "recipe-card";

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    const info = document.createElement("div");
    info.className = "recipe-info";

    const title = document.createElement("h5");
    title.textContent = recipe.name;

    const categoryRow = document.createElement("div");
    categoryRow.className = "category-row";

    const category = document.createElement("p");
    category.textContent = recipe.category;

    categoryRow.appendChild(category);
    info.append(title, categoryRow);
    card.append(image, info);

    addRecipeMenu(card, recipe.name);
    addFavouriteButton(card, recipe.name);

    wrapper.appendChild(card);

    return wrapper;
}

// =========================================
// FAVOURITE BUTTON
// =========================================

function addFavouriteButton(card, recipeName) {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "recipe-favourite-btn";

    function updateButton() {
        const isFavourite = getFavourites().includes(recipeName);

        button.textContent = isFavourite ? "♥" : "♡";
        button.classList.toggle("is-favourite", isFavourite);
        button.title = isFavourite
            ? "Remove from favourites"
            : "Add to favourites";
    }

    button.addEventListener("click", function () {

        let favourites = getFavourites();

        if (favourites.includes(recipeName)) {
            favourites = favourites.filter(item => item !== recipeName);
        } else {
            favourites.push(recipeName);
        }

        saveFavourites(favourites);
        updateButton();

    });

    card.appendChild(button);
    updateButton();
}

// =========================================
// DELETE RECIPE MENU
// =========================================

function addRecipeMenu(card, recipeName) {

    const menu = document.createElement("details");
    menu.className = "recipe-menu";

    const dots = document.createElement("summary");
    dots.textContent = "⋮";

    const options = document.createElement("div");
    options.className = "recipe-menu-options";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete Recipe";
    deleteBtn.className = "delete-option";

    deleteBtn.addEventListener("click", function () {

        if (!confirm("Are you sure you want to delete this recipe?")) {
            return;
        }

        const updatedRecipes = getStoredRecipes().filter(
            recipe => recipe.name !== recipeName
        );

        saveStoredRecipes(updatedRecipes);

        const updatedFavourites = getFavourites().filter(
            item => item !== recipeName
        );

        saveFavourites(updatedFavourites);

        renderRecipes();

    });

    options.appendChild(deleteBtn);
    menu.append(dots, options);

    const categoryRow = card.querySelector(".category-row");

    if (categoryRow) {
        categoryRow.appendChild(menu);
    }
}

// =========================================
// DISPLAY RECIPES
// =========================================

function renderRecipes() {

    if (!recipeList) return;

    recipeList.innerHTML = "";

    getStoredRecipes().forEach(recipe => {
        recipeList.appendChild(createRecipeCard(recipe));
    });

    updateRecipeList();
}

// =========================================
// ADD NEW RECIPE
// =========================================

if (saveRecipeBtn && recipeList) {

    saveRecipeBtn.addEventListener("click", function () {

        const nameInput = document.getElementById("recipeName");
        const categoryInput = document.getElementById("recipeCategory");
        const imageInput = document.getElementById("recipeImage");

        const name = nameInput.value.trim();
        const category = categoryInput.value;

        if (!name || !category || !imageInput.files.length) {
            alert("Please complete the recipe name, category and image.");
            return;
        }

        const recipes = getStoredRecipes();

        if (recipes.some(recipe =>
            recipe.name.toLowerCase() === name.toLowerCase()
        )) {
            alert("This recipe already exists.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            recipes.push({
                name: name,
                category: category,
                image: event.target.result
            });

            saveStoredRecipes(recipes);

            nameInput.value = "";
            categoryInput.value = "";
            imageInput.value = "";

            const modalElement = document.getElementById("addRecipeModal");
            const modalInstance = bootstrap.Modal.getInstance(modalElement);

            if (modalInstance) {
                modalInstance.hide();
            }

            renderRecipes();

            alert("Recipe added successfully!");
        };

        reader.onerror = function () {
            alert("Unable to read the selected image.");
        };

        reader.readAsDataURL(imageInput.files[0]);

    });

}

// =========================================
// SEARCH, FILTER AND SORT
// =========================================

function updateRecipeList() {

    if (!recipeList) return;

    const searchText = searchRecipe
        ? searchRecipe.value.toLowerCase().trim()
        : "";

    const selectedCategory = filterCategory
        ? filterCategory.value
        : "";

    const sortValue = sortRecipes
        ? sortRecipes.value
        : "";

    const cards = Array.from(recipeList.children);

    cards.sort((a, b) => {

        const nameA = a.querySelector(".recipe-info h5").textContent.toLowerCase();
        const nameB = b.querySelector(".recipe-info h5").textContent.toLowerCase();

        if (sortValue === "az") return nameA.localeCompare(nameB);
        if (sortValue === "za") return nameB.localeCompare(nameA);

        return 0;
    });

    cards.forEach(card => {

        recipeList.appendChild(card);

        const name = card.querySelector(".recipe-info h5")
            .textContent.toLowerCase();

        const category = card.querySelector(".category-row p")
            .textContent.trim();

        const matchesSearch = name.includes(searchText);

        const matchesCategory =
            selectedCategory === "" || category === selectedCategory;

        card.style.display =
            matchesSearch && matchesCategory ? "" : "none";
    });

    const visibleCount = cards.filter(
        card => card.style.display !== "none"
    ).length;

    if (recipeCount) {
        recipeCount.textContent = visibleCount;
    }
}

// =========================================
// CATEGORY FROM URL
// =========================================

const urlParams = new URLSearchParams(window.location.search);
const categoryFromURL = urlParams.get("category");

if (categoryFromURL && filterCategory) {

    const optionExists = Array.from(filterCategory.options)
        .some(option => option.value === categoryFromURL);

    if (optionExists) {
        filterCategory.value = categoryFromURL;
    }
}

// =========================================
// EVENT LISTENERS
// =========================================

if (searchRecipe) {
    searchRecipe.addEventListener("input", updateRecipeList);
}

if (filterCategory) {
    filterCategory.addEventListener("change", updateRecipeList);
}

if (sortRecipes) {
    sortRecipes.addEventListener("change", updateRecipeList);
}

// =========================================
// INITIAL DISPLAY
// =========================================

renderRecipes();

console.log("Savora Recipe Management loaded successfully.");
