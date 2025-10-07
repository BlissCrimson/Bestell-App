function getPizzaTemplates(indexPizzas) {
    return `
        <div class="meal-box">
            <div class="" id="" onclick="addToBasket(${indexPizzas})">
                <img class="add-symbol" src="./assets/icons/symbol/plus.svg" alt="Plus">
            </div>
            <div class="meal-show">
                <h2>${myPizzas[indexPizzas].name}</h2>
                <h3>${myPizzas[indexPizzas].description}</h3>
                <p class="color-o">${Math.max(myPizzas[indexPizzas].price)} €</p>
            </div>
    `
}

function getSaladsTemplates(indexSalads) {
    return `
        <div class="meal-box">
            <div class="" id="" onclick="addToBasket(${indexSalads})">
                <img class="add-symbol" src="./assets/icons/symbol/plus.svg" alt="Plus">
            </div>
            <div class="meal-show">
                <h2>${mySalads[indexSalads].name}</h2>
                <h3>${mySalads[indexSalads].description}</h3>
                <p class="color-o">${Math.max(mySalads[indexSalads].price)} €</p>
            </div>
    `
}