
/* =========================================
   SAVORA - FAVOURITES MANAGEMENT
========================================= */

const favouriteList = document.getElementById("favouriteList");
const favouriteCount = document.getElementById("favouriteCount");
const emptyFavourite = document.getElementById("emptyFavourite");
const searchFavourite = document.getElementById("searchFavourite");

const FAVOURITES_KEY = "savoraFavourites";
const RECIPES_KEY = "savoraRecipes";

// =========================================
// GET SAVED DATA
// =========================================

function getFavourites() {
    try {
        const data = JSON.parse(localStorage.getItem(FAVOURITES_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function getRecipes() {
    try {
        const data = JSON.parse(localStorage.getItem(RECIPES_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

// =========================================
// DISPLAY FAVOURITES
// =========================================

function displayFavourites() {

    if (!favouriteList) return;

    const favourites = getFavourites();
    const recipes = getRecipes();

    const searchText = searchFavourite
        ? searchFavourite.value.toLowerCase().trim()
        : "";

    // Only display favourites that still exist
    const favouriteRecipes = recipes.filter(recipe =>
        favourites.includes(recipe.name)
    );

    const filteredRecipes = favouriteRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText)
    );

    favouriteList.innerHTML = "";

    // Count actual saved favourite recipes
    favouriteCount.textContent =
        `${favouriteRecipes.length} recipes saved`;

    if (favouriteRecipes.length === 0) {

        emptyFavourite.style.display = "block";
        favouriteList.style.display = "none";

        return;
    }

    emptyFavourite.style.display = "none";
    favouriteList.style.display = "grid";

    if (filteredRecipes.length === 0) {

        favouriteList.innerHTML = `
            <p class="no-search-result">
                No matching favourite recipes found.
            </p>
        `;

        return;
    }

    filteredRecipes.forEach(recipe => {

        const card = document.createElement("div");
        card.className = "favourite-card";

        // IMAGE
        const imageBox = document.createElement("div");
        imageBox.className = "favourite-image";

        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-favourite";
        removeButton.type = "button";
        removeButton.textContent = "♥";
        removeButton.title = "Remove Favourite";

        imageBox.append(image, removeButton);

        // RECIPE INFORMATION
        const info = document.createElement("div");
        info.className = "favourite-info";

        const category = document.createElement("p");
        category.textContent = recipe.category || "Uncategorized";

        const title = document.createElement("h4");
        title.textContent = recipe.name;

        const removeText = document.createElement("button");
        removeText.className = "remove-text";
        removeText.type = "button";
        removeText.textContent = "Remove Favourite";

        info.append(category, title, removeText);

        card.append(imageBox, info);
        favouriteList.appendChild(card);

        // REMOVE FAVOURITE
        function removeFavourite() {

            const updatedFavourites = getFavourites().filter(
                name => name !== recipe.name
            );

            try {

                localStorage.setItem(
                    FAVOURITES_KEY,
                    JSON.stringify(updatedFavourites)
                );

                displayFavourites();

            } catch (error) {

                alert("Unable to update favourites. Please try again.");

            }
        }

        removeButton.addEventListener("click", removeFavourite);
        removeText.addEventListener("click", removeFavourite);

    });

}

// =========================================
// SEARCH
// =========================================

if (searchFavourite) {
    searchFavourite.addEventListener("input", displayFavourites);
}

// =========================================
// INITIAL DISPLAY
// =========================================

displayFavourites();

// =========================================
// STORAGE UPDATE
// =========================================

window.addEventListener("storage", function (event) {

    if (
        event.key === FAVOURITES_KEY ||
        event.key === RECIPES_KEY ||
        event.key === null
    ) {
        displayFavourites();
    }

});

console.log("Savora Favourites loaded successfully.");
