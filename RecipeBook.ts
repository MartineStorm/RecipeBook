interface Recipe {
    title: string;
    ingredients: string[];
    category: string;
    image: string;
}

// Default recipe list
let recipes: Recipe[] = [
    {
        title: 'Chocolate Cake',
        ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs'],
        category: 'dessert',
        image: 'images/chocolate-cake.jpg'
    },
    {
        title: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Bacon'],
        category: 'main course',
        image: 'images/spaghetti-carbonara.jpg'
    },
    {
        title: 'Caesar Salad',
        ingredients: ['Lettuce', 'Croutons', 'Chicken', 'Parmesan'],
        category: 'appetizer',
        image: 'images/caesar-salad.jpg'
    }
];

// Get HTML elements
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const filterCategory = document.getElementById('filterCategory') as HTMLSelectElement;
const recipeContainer = document.getElementById('recipeContainer') as HTMLElement;
const addRecipeButton = document.getElementById('addRecipeButton') as HTMLElement;
const modal = document.getElementById('recipeModal') as HTMLElement;
const closeModal = document.querySelector('.close') as HTMLElement;
const addRecipeForm = document.getElementById('addRecipeForm') as HTMLFormElement;

// Display recipes function
function displayRecipes(recipesToDisplay: Recipe[]): void {
    recipeContainer.innerHTML = ''; // Clear the container
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Render recipe card with image, title, category, and ingredients
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
            <h3>${recipe.title}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Function to filter recipes based on search and category
function filterRecipes(): void {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

// Event listeners for filtering
searchInput.addEventListener('input', filterRecipes);
filterCategory.addEventListener('change', filterRecipes);

// Modal functionality (show and hide modal)
addRecipeButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Add new recipe functionality
addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const title = (document.getElementById('recipeTitle') as HTMLInputElement).value;
    const ingredients = (document.getElementById('recipeIngredients') as HTMLInputElement).value.split(',').map(ing => ing.trim());
    const category = (document.getElementById('recipeCategory') as HTMLSelectElement).value;
    const image = (document.getElementById('recipeImage') as HTMLInputElement).value;

    // Create a new recipe object
    const newRecipe: Recipe = {
        title,
        ingredients,
        category,
        image
    };

    // Add the new recipe to the array
    recipes.push(newRecipe);

    // Close the modal
    modal.style.display = 'none';

    // Clear the form
    addRecipeForm.reset();

    // Display the updated list of recipes
    displayRecipes(recipes);
});

// Initial display of all recipes on page load
displayRecipes(recipes);
