const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const recipeContainer = document.getElementById("recipeContainer");
const recipeDetailsContent = document.getElementById("recipe-details-content");
const closeButton = document.getElementById("recipe-close-button");

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    const searchinput = searchBox.value.trim();
    if(!searchinput){
        alert("please type something");
    }else{
        fetchRecipies(searchinput);
    }
});

//get recipies
async function fetchRecipies(query){
    recipeContainer.innerHTML="<h2>Fetching recipees...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML="";

    response.meals.forEach(meal =>{
        const recipiediv = document.createElement('div');

        //giving a div
        recipiediv.classList.add('recipe');

        //assigning a card via innerhtml to div
        recipiediv.innerHTML =`
        <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strArea} Dish</p>
        <p>${meal.strCategory} category</p>
        `;
        //recipee button
        const button = document.createElement('button');
        button.classList.add("btn1");
        button.textContent = "View Recipe";

        //add event listener to recipe button
        button.addEventListener('click',function(){
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipiediv);
        recipiediv.appendChild(button);
    });
    //console.log(response.meals);
}

function openRecipePopup(meal){
    recipeDetailsContent.innerHTML = `
        <h2 class="name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="Ingredient">${FetchIngredients(meal)}</ul></br>
        <div class"instructions">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p></br>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
}


// get ingredients
function FetchIngredients(meal){
    let ingredientsList='';

    for(let i=0;i<=20;i++){
        const ingredients = meal[`strIngredient${(i)}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${ingredients} ${measure}</li>`;
        }
    }
    return ingredientsList;
    
}

closeButton.addEventListener('click',function(){
    recipeDetailsContent.parentElement.style.display = "none";
});

