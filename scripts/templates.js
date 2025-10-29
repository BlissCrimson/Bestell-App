function getMealsTemplates(indexAllMeals, indexMeals) {
    return `
        <div id="meal(${indexAllMeals})" class="meal-box border-color" onclick="addMealToBasket(${indexAllMeals}, ${indexMeals})">
            <div class="add-basket border-color">
                <img src="./assets/icons/symbols/plus-solid-full.svg" alt="">
            </div>
            <div class="meal-show">
                <h2>${allMeals[indexAllMeals].menu.main_disches[indexMeals].name}</h2>
                <h3>${allMeals[indexAllMeals].menu.main_disches[indexMeals].description}</h3>
                <p class="color-o">${(allMeals[indexAllMeals].menu.main_disches[indexMeals].price.toFixed(2))} €</p>
            </div>
    `
}

function getSaladMealsTemplates(indexAllSaladMeals, indexSaladMeals){
    return `
        <div id="meal(${indexAllSaladMeals})" class="meal-box border-color" onclick="addSaladToBasket(${indexAllSaladMeals}, ${indexSaladMeals})">
            <div class="add-basket border-color">
                <img src="./assets/icons/symbols/plus-solid-full.svg" alt="">
            </div>
            <div class="meal-show">
                <h2>${allMeals[indexAllSaladMeals].menu.salad_dishes[indexSaladMeals].name}</h2>
                <h3>${allMeals[indexAllSaladMeals].menu.salad_dishes[indexSaladMeals].description}</h3>
                <p class="color-o">${(allMeals[indexAllSaladMeals].menu.salad_dishes[indexSaladMeals].price.toFixed(2))} €</p>
            </div>
    `
}
function getEmptyBasketTemplates() {
    return `
        <p>
            Dein Warenklorb ist Leer.
        </p>
    `
}

function getBasketTemplates(indexBasket, idbasketDialog) {
    return `
        <div class="basket-meal">
            <h5>${basket.mealTitle[indexBasket]}</h4>
            <div class="basket-delivery">
                <button class="btn-basket" onclick="fewerMeal(${indexBasket})"><img src="./assets/icons/symbols/minus-solid-full.svg" alt=""></button>
                <p>${basket.amount[indexBasket]} x</p>
                <button class="btn-basket" onclick="moreMeal(${indexBasket})"><img src="./assets/icons/symbols/plus-solid-full.svg" alt=""></button>
                <p>${(EUR.format(basket.price[indexBasket] * basket.amount[indexBasket]))}</p>
                <button class="btn-basket">
                    <img    class="bin" 
                            id="deleteMeal" 
                            onclick="deleteFromBasket(${indexBasket})"
                            src="./assets/icons/symbols/trash-can-solid-full.svg"
                            alt="Mülleimer"
                </button>
                </div>
        </div>
    `
}

function getDialogBasketTemplates(indexBasket) {
    return `
         <div class="basket-meal">
            <h5>${basket.mealTitle[indexBasket]}</h4>
            <div class="basket-delivery">
                <button class="btn-basket" onclick="fewerMeal(${indexBasket})"><img src="./assets/icons/symbols/minus-solid-full.svg" alt=""></button>
                <p>${basket.amount[indexBasket]} x</p>
                <button class="btn-basket" onclick="moreMeal(${indexBasket})"><img src="./assets/icons/symbols/plus-solid-full.svg" alt=""></button>
                <p>${(EUR.format(basket.price[indexBasket] * basket.amount[indexBasket]))}</p>
                <button class="btn-basket">
                    <img    class="bin" 
                            id="deleteMeal" 
                            onclick="deleteFromBasket(${indexBasket})"
                            src="./assets/icons/symbols/trash-can-solid-full.svg"
                            alt="Mülleimer"
                </button>
                </div>
        </div>
    `
}
