const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById('meal-container')
    mealsContainer.innerHTML = ''
    for (const meal of meals) {
        const mealDiv = document.createElement('div')
        mealDiv.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `
        mealsContainer.appendChild(mealDiv)
    }
}

const SearchFood = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    loadMeals(searchText)
    searchField.value = ''
}

const loadMealDetail = (code) => {
    const codeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`
    fetch(codeUrl)
        .then(res => res.json())
        .then(data => displayDetail(data.meals[0]))
}

const displayDetail = meal => {
    const mealDetailContainer = document.getElementById('meal-details-container')
    mealDetailContainer.innerHTML = ''
    const mealDiv = document.createElement('div')
    mealDiv.classList.add('card')
    mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <h6 class="card-title">${meal.strArea} | ${meal.strCategory} item</h6>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        <h6 class="card-title">Price ${meal.idMeal}¥</h6>
        <a href='https://www.themealdb.com/browse.php?s=${meal.strMeal}' target="_blank" class="btn btn-primary">Go somewhere</a>
        <a href='${meal.strYoutube}' target="_blank" class="btn btn-primary">See and listen the recipe</a>
    </div>
    `
    mealDetailContainer.appendChild(mealDiv)
}

loadMeals('')