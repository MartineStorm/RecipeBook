interface Recipe {
    title: string;
    ingredients: string[];
    category: string;
}

const recipes: Recipe[] = [
    { title: 'Chocolate Cake', ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs'], category: 'dessert' },
    { title: 'Spaghetti Carbonara', ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Bacon'], category: 'main course' },
    { title: 'Caesar Salad', ingredients: ['Lettuce', 'Croutons', 'Chicken', 'Parmesan'], category: 'appetizer' },
    // Add more recipes as needed
];

const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const filterCategory = document.getElementById('filterCategory') as HTMLSelectElement;
const recipeContainer = document.getElementById('recipeContainer') as HTMLDivElement;

// Function to display recipes
function displayRecipes(recipesToDisplay: Recipe[]): void {
    recipeContainer.innerHTML = '';
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-category">${recipe.category}</div>
            <div class="recipe-ingredients">
                Ingredients: ${recipe.ingredients.join(', ')}
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}

// Function to filter recipes by search term and category
function filterRecipes(): void {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearchTerm = recipe.title.toLowerCase().includes(searchTerm) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

        return matchesSearchTerm && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

// Event listeners for filtering
searchInput.addEventListener('input', filterRecipes);
filterCategory.addEventListener('change', filterRecipes);

// Initial display of all recipes
displayRecipes(recipes);
