

let subTotal = 0;
let deliveryCosts = 5.50;
let totalPrice = 0;

function init() {
    renderAllMeals();
}

function dropdownMenue() {
    console.log("test");
    document.getElementById('menue').classList.toggle("d_none");
}
function renderAllMeals() {
    let allMealsRef = document.getElementById('pizza');
    for (let indexAllMeals = 0; indexAllMeals < allMeals.length; indexAllMeals++) {
        allMealsRef.innerHTML += getMealsTemplates(indexAllMeals);

    }
}

function addToBasket(indexAllMeals, startKey, destinationKey) {
    let basketRef = document.getElementById('basketMeals');
    basketRef.innerHTML += getBasketTemplates(indexAllMeals);



    // basketRef.innerHTML += getBasketTemplates(indexPizzas);

}

function basketCalculation() {
    let subTotal = document.getElementById('subPrice')
    let deliveryRef = document.getElementById('deliveryPrice')
    let priceRef = document.getElementById('totalBasket');

}

function deleteFromBasket(indexPizzas) {
    console.table(myPizzas[indexPizzas]);

}
