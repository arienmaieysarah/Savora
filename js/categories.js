
/* ==========================================
   SAVORA - CATEGORY & RECIPE POPUP SYSTEM
========================================== */

// ==========================================
// COMPLETE RECIPE DETAILS
// ==========================================

const defaultRecipes = [
    {
        name: "Grilled Chicken",
        category: "Main Course",
        image: "assets/chicken.jpeg",
        description: "Juicy and flavourful grilled chicken.",
        time: "35 minutes",
        servings: "2 servings",
        ingredients: [
            "2 chicken pieces",
            "2 cloves garlic, minced",
            "1 tablespoon olive oil",
            "1 tablespoon soy sauce",
            "1 teaspoon black pepper",
            "1 teaspoon paprika",
            "Salt to taste"
        ],
        steps: [
            "Wash and pat dry the chicken.",
            "Mix garlic, olive oil, soy sauce, pepper, paprika and salt.",
            "Coat the chicken evenly with the marinade.",
            "Marinate for at least 20 minutes.",
            "Grill the chicken over medium heat until fully cooked.",
            "Serve warm with your favourite side dish."
        ]
    },
    {
        name: "Chocolate Cake",
        category: "Dessert",
        image: "assets/cake.jpeg",
        description: "A soft and rich chocolate cake.",
        time: "50 minutes",
        servings: "6 servings",
        ingredients: [
            "1 cup all-purpose flour",
            "1/2 cup cocoa powder",
            "3/4 cup sugar",
            "2 eggs",
            "1/2 cup milk",
            "1/3 cup cooking oil",
            "1 teaspoon baking powder"
        ],
        steps: [
            "Preheat the oven to 180°C.",
            "Mix flour, cocoa powder, sugar and baking powder.",
            "Add eggs, milk and cooking oil.",
            "Mix until the batter is smooth.",
            "Pour the batter into a greased cake tin.",
            "Bake for 30–35 minutes or until a skewer comes out clean.",
            "Allow the cake to cool before serving."
        ]
    },
    {
        name: "Caramel Pudding",
        category: "Dessert",
        image: "assets/caramel-pudding.jpeg",
        description: "Smooth and creamy pudding with golden caramel.",
        time: "45 minutes",
        servings: "4 servings",
        ingredients: [
            "4 eggs",
            "500 ml fresh milk",
            "1/2 cup sugar",
            "1 teaspoon vanilla essence",
            "1/4 cup sugar for caramel"
        ],
        steps: [
            "Melt 1/4 cup sugar in a pan until golden brown.",
            "Pour the caramel into small pudding moulds.",
            "Whisk eggs, milk, sugar and vanilla essence gently.",
            "Strain the mixture for a smooth texture.",
            "Pour into the prepared moulds.",
            "Steam for 25–30 minutes until set.",
            "Cool and refrigerate before serving."
        ]
    },
    {
        name: "Burnt Cheesecake",
        category: "Dessert",
        image: "assets/burnt-cheesecake.jpeg",
        description: "Creamy cheesecake with a beautifully caramelised top.",
        time: "60 minutes",
        servings: "6 servings",
        ingredients: [
            "500 g cream cheese",
            "3/4 cup sugar",
            "3 eggs",
            "1 cup whipping cream",
            "2 tablespoons all-purpose flour",
            "1 teaspoon vanilla essence"
        ],
        steps: [
            "Preheat the oven to 220°C.",
            "Beat cream cheese and sugar until smooth.",
            "Add eggs one at a time.",
            "Mix in whipping cream, flour and vanilla.",
            "Pour into a lined cake tin.",
            "Bake for 35–40 minutes until the top is dark brown.",
            "Cool completely and refrigerate before serving."
        ]
    },
    {
        name: "Strawberry Cheesecake",
        category: "Dessert",
        image: "assets/cheesecake.jpeg",
        description: "A creamy cheesecake topped with sweet strawberries.",
        time: "40 minutes + chilling",
        servings: "6 servings",
        ingredients: [
            "150 g digestive biscuits",
            "70 g melted butter",
            "250 g cream cheese",
            "1/2 cup whipping cream",
            "1/3 cup icing sugar",
            "1 teaspoon vanilla essence",
            "Fresh strawberries",
            "Strawberry jam for topping"
        ],
        steps: [
            "Crush the digestive biscuits into fine crumbs.",
            "Mix with melted butter and press into a cake tin.",
            "Refrigerate the biscuit base for 20 minutes.",
            "Beat cream cheese, icing sugar and vanilla until smooth.",
            "Add whipping cream and mix until creamy.",
            "Spread the mixture over the biscuit base.",
            "Top with strawberry jam and fresh strawberries.",
            "Refrigerate for at least 4 hours before serving."
        ]
    },
    {
        name: "Creamy Pasta",
        category: "Italian Cuisine",
        image: "assets/pasta.jpeg",
        description: "Creamy pasta with a rich and savoury sauce.",
        time: "25 minutes",
        servings: "2 servings",
        ingredients: [
            "200 g pasta",
            "1 cup cooking cream",
            "2 cloves garlic, minced",
            "1 tablespoon butter",
            "1/4 cup grated cheese",
            "Black pepper",
            "Salt to taste"
        ],
        steps: [
            "Boil pasta in salted water until al dente.",
            "Melt butter in a pan.",
            "Add garlic and cook until fragrant.",
            "Pour in cooking cream and stir gently.",
            "Add grated cheese, salt and black pepper.",
            "Add the cooked pasta and mix well.",
            "Serve warm."
        ]
    },
    {
        name: "Bolognese Pasta",
        category: "Italian Cuisine",
        image: "assets/bolognese.jpeg",
        description: "Classic pasta served with a rich tomato meat sauce.",
        time: "35 minutes",
        servings: "2 servings",
        ingredients: [
            "200 g spaghetti",
            "150 g minced beef",
            "1 cup tomato pasta sauce",
            "1 small onion, chopped",
            "2 cloves garlic, minced",
            "1 tablespoon olive oil",
            "Salt and black pepper"
        ],
        steps: [
            "Boil spaghetti until al dente.",
            "Heat olive oil in a pan.",
            "Add onion and garlic and cook until fragrant.",
            "Add minced beef and cook until browned.",
            "Pour in tomato sauce and season with salt and pepper.",
            "Simmer for 10–15 minutes.",
            "Serve the sauce over the cooked spaghetti."
        ]
    },
    {
        name: "Rose Tteokbokki",
        category: "Korean Cuisine",
        image: "assets/rose-tteokbokki.jpeg",
        description: "Chewy Korean rice cakes in a creamy spicy sauce.",
        time: "25 minutes",
        servings: "2 servings",
        ingredients: [
            "200 g Korean rice cakes",
            "1 cup milk",
            "1/2 cup cooking cream",
            "1 tablespoon gochujang",
            "1 tablespoon tomato sauce",
            "2 cloves garlic, minced",
            "1 sausage, sliced",
            "1 tablespoon cooking oil"
        ],
        steps: [
            "Soak rice cakes in warm water for 10 minutes.",
            "Heat cooking oil in a pan.",
            "Add garlic and sliced sausage.",
            "Add gochujang and tomato sauce.",
            "Pour in milk and cooking cream.",
            "Add rice cakes and simmer until soft.",
            "Stir until the sauce becomes thick and creamy.",
            "Serve while hot."
        ]
    },
    {
        name: "Garlic Cream Cheese Bread",
        category: "Bakery",
        image: "assets/garlic-bread.jpeg",
        description: "Soft bread filled with creamy cheese and garlic butter.",
        time: "30 minutes",
        servings: "4 pieces",
        ingredients: [
            "4 small bread rolls",
            "100 g cream cheese",
            "3 tablespoons melted butter",
            "2 cloves garlic, minced",
            "1 tablespoon chopped parsley",
            "1 tablespoon condensed milk"
        ],
        steps: [
            "Mix cream cheese with condensed milk.",
            "Cut the bread into sections without cutting all the way through.",
            "Fill the bread with the cream cheese mixture.",
            "Mix melted butter, garlic and parsley.",
            "Brush the garlic butter over the bread.",
            "Bake at 180°C for 10–15 minutes.",
            "Serve warm."
        ]
    },
    {
        name: "Strawberry Smoothie",
        category: "Drinks",
        image: "assets/strawberry-smoothie.jpeg",
        description: "A refreshing and creamy strawberry drink.",
        time: "10 minutes",
        servings: "1 glass",
        ingredients: [
            "1 cup fresh strawberries",
            "1/2 cup fresh milk",
            "1/2 cup plain yoghurt",
            "1 tablespoon honey",
            "Ice cubes"
        ],
        steps: [
            "Wash and remove the strawberry stems.",
            "Add strawberries, milk and yoghurt into a blender.",
            "Add honey and ice cubes.",
            "Blend until smooth.",
            "Pour into a glass and serve immediately."
        ]
    },
    {
        name: "Strawberry Sparkling",
        category: "Drinks",
        image: "assets/strawberry-sparkling.jpeg",
        description: "A fizzy strawberry drink with a refreshing taste.",
        time: "5 minutes",
        servings: "1 glass",
        ingredients: [
            "5 fresh strawberries",
            "1 tablespoon strawberry syrup",
            "200 ml sparkling water",
            "Ice cubes",
            "Fresh mint leaves"
        ],
        steps: [
            "Wash and slice the strawberries.",
            "Place strawberries and strawberry syrup into a glass.",
            "Add ice cubes.",
            "Pour in sparkling water slowly.",
            "Stir gently and garnish with mint leaves.",
            "Serve immediately."
        ]
    },
    {
        name: "Velvet Latte",
        category: "Drinks",
        image: "assets/velvet-latte.jpeg",
        description: "A smooth and creamy latte for coffee lovers.",
        time: "10 minutes",
        servings: "1 cup",
        ingredients: [
            "1 shot espresso or strong coffee",
            "200 ml fresh milk",
            "1 tablespoon sugar or syrup",
            "Milk foam",
            "Cocoa powder for garnish"
        ],
        steps: [
            "Prepare one shot of espresso or strong coffee.",
            "Heat the milk gently.",
            "Froth the milk until smooth and creamy.",
            "Pour the coffee into a cup.",
            "Add sugar or syrup if desired.",
            "Pour the steamed milk over the coffee.",
            "Top with milk foam and a little cocoa powder."
        ]
    }
];

// ==========================================
// CATEGORY DESCRIPTIONS
// ==========================================

const categoryDescriptions = {
    "Main Course": "Hearty meals made for every occasion.",
    "Dessert": "Sweet treats and delightful creations.",
    "Italian Cuisine": "Classic Italian-inspired favourites.",
    "Korean Cuisine": "Bold flavours and Korean-inspired dishes.",
    "Bakery": "Freshly baked homemade delights.",
    "Drinks": "Refreshing drinks for every moment."
};

// ==========================================
// LOCAL STORAGE INTEGRATION
// ==========================================

function getCategoryRecipes() {

    let storedRecipes = [];

    try {
        storedRecipes = JSON.parse(
            localStorage.getItem("savoraRecipes")
        );
    } catch (error) {
        storedRecipes = [];
    }

    if (!Array.isArray(storedRecipes)) {
        storedRecipes = [];
    }

    return storedRecipes.map(recipe => {

        const details = defaultRecipes.find(item =>
            item.name.toLowerCase() ===
            (recipe.name || "").toLowerCase()
        );

        return {
            ...details,
            ...recipe,
            image: recipe.image || details?.image || "",
            description: details?.description ||
                "A delicious recipe from your Savora collection.",
            time: details?.time || "Not specified",
            servings: details?.servings || "Not specified",
            ingredients: details?.ingredients || [],
            steps: details?.steps || []
        };
    });
}

// ==========================================
// BOOTSTRAP MODALS
// ==========================================

const selectionModalElement = document.getElementById("recipeSelectionModal");
const detailsModalElement = document.getElementById("recipeDetailsModal");

const selectionModal = new bootstrap.Modal(selectionModalElement);
const detailsModal = new bootstrap.Modal(detailsModalElement);

let currentCategory = "";

// ==========================================
// OPEN CATEGORY POPUP
// ==========================================

document.querySelectorAll(".category-item").forEach(button => {

    button.addEventListener("click", function () {

        currentCategory = this.dataset.category;

        document.getElementById("selectedCategoryTitle").textContent =
            currentCategory;

        document.getElementById("selectedCategoryDescription").textContent =
            categoryDescriptions[currentCategory] || "Explore delicious recipes.";

        displayCategoryRecipes(currentCategory);

        selectionModal.show();
    });

});

// ==========================================
// DISPLAY RECIPES IN CATEGORY
// ==========================================

function displayCategoryRecipes(category) {

    const recipeContainer = document.getElementById("categoryRecipeList");

    recipeContainer.innerHTML = "";

    const selectedRecipes = getCategoryRecipes().filter(recipe =>
        recipe.category === category
    );

    if (selectedRecipes.length === 0) {

        recipeContainer.innerHTML =
            "<p class='text-center'>No recipes available in this category yet.</p>";

        return;
    }

    selectedRecipes.forEach((recipe, index) => {

        const card = document.createElement("button");

        card.type = "button";
        card.className = "recipe-popup-card";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "recipe-popup-image";

        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;

        const info = document.createElement("div");
        info.className = "recipe-popup-info";

        const number = document.createElement("span");
        number.textContent = `RECIPE ${String(index + 1).padStart(2, "0")}`;

        const title = document.createElement("h5");
        title.textContent = recipe.name;

        const time = document.createElement("p");
        time.textContent = recipe.time;

        imageWrapper.appendChild(image);
        info.append(number, title, time);
        card.append(imageWrapper, info);

        card.addEventListener("click", function () {

            selectionModal.hide();

            selectionModalElement.addEventListener(
                "hidden.bs.modal",
                function openDetails() {

                    selectionModalElement.removeEventListener(
                        "hidden.bs.modal",
                        openDetails
                    );

                    displayRecipeDetails(recipe);
                    detailsModal.show();
                }
            );

        });

        recipeContainer.appendChild(card);

    });

}

// ==========================================
// DISPLAY RECIPE DETAILS
// ==========================================

function displayRecipeDetails(recipe) {

    document.getElementById("detailRecipeName").textContent =
        recipe.name;

    document.getElementById("detailRecipeImage").src =
        recipe.image;

    document.getElementById("detailRecipeDescription").textContent =
        recipe.description;

    document.getElementById("detailRecipeTime").textContent =
        "⏱ " + recipe.time;

    document.getElementById("detailRecipeServings").textContent =
        "♧ " + recipe.servings;

    // INGREDIENTS
    const ingredientsList = document.getElementById("detailRecipeIngredients");

    ingredientsList.innerHTML = "";

    if (recipe.ingredients.length === 0) {

        const item = document.createElement("li");
        item.textContent = "Ingredients have not been added yet.";
        ingredientsList.appendChild(item);

    } else {

        recipe.ingredients.forEach(ingredient => {

            const item = document.createElement("li");
            item.textContent = ingredient;
            ingredientsList.appendChild(item);

        });

    }

    // COOKING STEPS
    const stepsList = document.getElementById("detailRecipeSteps");

    stepsList.innerHTML = "";

    if (recipe.steps.length === 0) {

        const item = document.createElement("li");
        item.textContent = "Cooking steps have not been added yet.";
        stepsList.appendChild(item);

    } else {

        recipe.steps.forEach(step => {

            const item = document.createElement("li");
            item.textContent = step;
            stepsList.appendChild(item);

        });

    }

}

// ==========================================
// RETURN TO CATEGORY AFTER CLOSING DETAILS
// ==========================================

detailsModalElement.addEventListener("hidden.bs.modal", function () {

    displayCategoryRecipes(currentCategory);

    selectionModal.show();

});

console.log("Savora Categories loaded successfully.");
