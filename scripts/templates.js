function getMealsTemplates(indexAllMeals) {
    return `
        <div id="meal(${indexAllMeals})" class="meal-box border-color" onclick="addToBasket(${indexAllMeals})">
            <div class="add-basket border-color">
                <img src="./assets/icons/symbols/plus-solid-full.svg" alt="">
            </div>
            <div class="meal-show">
                <h2>${allMeals[indexAllMeals].name}</h2>
                <h3>${allMeals[indexAllMeals].description}</h3>
                <p class="color-o">${(allMeals[indexAllMeals].price.toFixed(2))} €</p>
            </div>
    `
}

function getBasketTemplates(indexAllMeals) {
    return `
        <div class="basket-meal" id="pizza(${indexAllMeals})">
            <h5>${allMeals[indexAllMeals].name}</h4>
            <div class="basket-delivery">
                <button class="btn-basket"><img src="./assets/icons/symbols/minus-solid-full.svg" alt=""></button>
                <p> x</p>
                <button class="btn-basket"><img src="./assets/icons/symbols/plus-solid-full.svg" alt=""></button>
                <p>${(allMeals[indexAllMeals].price.toFixed(2))} €</p>
                <button class="btn-basket">
                    <img    class="bin" 
                            id="deleteMeal" 
                            onclick="deleteFromBasket(${indexAllMeals})"
                            src="./assets/icons/symbols/trash-can-solid-full.svg"
                            alt="Mülleimer"
                </button>
                </div>
        </div>
    `
}