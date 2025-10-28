const EUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
// Daten für den Warenkorb
let basket = {
    mealTitle: [],
    price: [],
    amount: [],
};

// Werte für die Kosten
let basketValue = {
    deliveryCosts: 5.50,
    totalPrice: 0
};

let elementRef = {
    basket: document.getElementById('basket')
}
// erstes laden der Seite
function init() {
    getFromLocalStorage();
    // renderBasket();
    renderAllMeals();
    basketCalculation();
}

function dropdownMenue() {
    console.log("test");
    document.getElementById('menue').classList.toggle("d_none");
}
// RENDERING
function renderAllMeals(indexBasket) {
    let allMealsRef = document.getElementById('meals');
    for (let indexAllMeals = 0; indexAllMeals < allMeals.length; indexAllMeals++) {
        allMealsRef.innerHTML += getMealsTemplates(indexAllMeals, indexBasket);
    }
}

function renderBasket() {
    let dishMealRef = document.getElementById('basket');
    dishMealRef.innerHTML = "";
    // if (!basket || basket.length === 0) {
    //     dishMealRef = getEmptyBasketTemplates();
    // }
    for (let indexBasket = 0; indexBasket < basket.mealTitle.length; indexBasket++) {
        basketCalculation();
        dishMealRef.innerHTML += getBasketTemplates(indexBasket);
    }
}

function renderDialogBasket(indexBasket) {
    let dialogBasketRef = document.getElementById('basketDialog')
    renderBasket();
    dialogBasketRef.innerHTML += getDialogBasketTemplates(indexBasket);
}
function addToBasket(indexAllMeals) {
    let allMealRef = allMeals[indexAllMeals];
    let mealTitleRef = allMealRef.name;
    let mealPriceRef = allMealRef.price;

    if (!basket.mealTitle.includes(mealTitleRef)) {
        basket.mealTitle.push(mealTitleRef);
        basket.price.push(mealPriceRef);
        basket.amount.push(1);
        renderBasket(indexAllMeals);
        basketCalculation();
    } else {
        basket.amount[basket.mealTitle.indexOf(mealTitleRef)] += 1;
        renderBasket();
        basketCalculation();
    }
    saveToLocalStorage();
}
// BASKET AMOUNT
function fewerMeal(indexBasket) {
    if (basket.amount[indexBasket] < 2) {
        deleteFromBasket(indexBasket);
        renderBasket();
        basketCalculation();
    }

    if (basket.amount[indexBasket] > 1) {
        basket.amount[indexBasket]--;
        renderBasket();
        basketCalculation();
    }
    saveToLocalStorage();
}

function moreMeal(indexBasket) {
    basket.amount[indexBasket]++;
    renderBasket();
    basketCalculation();
    saveToLocalStorage();
}

function basketCalculation() {
    let subPriceRef = document.getElementById('subPrice')
    let deliveryRef = document.getElementById('deliveryPrice')
    let priceRef = document.getElementById('totalBasket');
    for (let i = 0; i < basket.mealTitle.length; i++) {
        if (i >= 0) {
            let x = basket.amount[i];
            let y = basket.price[i];
            let basketSubPrice = x * y;
            subPriceRef.innerHTML = EUR.format(basketSubPrice);
            deliveryRef.innerHTML = EUR.format(basketValue.deliveryCosts);
            totalPrice = basketSubPrice + basketValue.deliveryCosts;
            priceRef.innerHTML = EUR.format(totalPrice);
        }
        if (i ) {
            let basketPrice = basket.price[i];
            let basketAmount = basket.amount[i];
            basketSubPrice = basketPrice * basketAmount;
            subPriceRef.innerHTML = EUR.format(basketSubPrice);
            deliveryRef.innerHTML = EUR.format(basketValue.deliveryCosts);
            totalPrice = basketSubPrice + basketValue.deliveryCosts;
            priceRef.innerHTML = EUR.format(totalPrice);
        }
    }
}

function deleteFromBasket(indexBasket) {
    let trashBasketRef = document.getElementById('basket');
    basket.mealTitle.splice(indexBasket, 1);
    basket.price.splice(indexBasket, 1);
    basket.amount.splice(indexBasket, 1);
    trashBasketRef.innerHTML = "";
    renderBasket();
    basketCalculation();
    saveToLocalStorage();
}
// OPEN&CLOSE DIALOG
function openDialog(indexBasket) {
    let dialogRef = document.getElementById('dialogBasket');
    dialogRef.showModal();
    renderDialogBasket(indexBasket);
    basketCalculation();
    getDialogBasketTemplates();

}

function closeDialog() {
    dialogRef.close();
}