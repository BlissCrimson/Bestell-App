const EUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
// Daten für den Warenkorb
let basket = {
    mealTitle: [],
    price: [],
    amount: [],
};

// Werte für die Kosten
// let basketValue = {
//     deliveryCosts: 5.50,
//     totalPrice: 0
// };

let elementRef = {
    basket: document.getElementById('basket')
}
// erstes laden der Seite
function init() {
    getFromLocalStorage();
    renderBasket();
    renderSaladMeals();
    renderAllMeals();
    basketCalculation();
}

function dropdownMenue() {
    console.log("test");
    document.getElementById('menue').classList.toggle("d_none");
}
// RENDERING
function renderAllMeals() {
    let allMealsRef = document.getElementById('meals');
    allMealsRef.innerHTML = "";
    for (let indexAllMeals = 0; indexAllMeals < allMeals.length; indexAllMeals++) {
        let meals = allMeals[indexAllMeals].menu.main_disches;
        for (let indexMeals = 0; indexMeals < meals.length; indexMeals++) {
            allMealsRef.innerHTML += getMealsTemplates(indexAllMeals, indexMeals);
        }
    }
}

function renderSaladMeals() {
    let saladMealsRef = document.getElementById('saladMeals');
    for (let indexAllSaladMeals = 0; indexAllSaladMeals < allMeals.length; indexAllSaladMeals++) {
        let saladMeals = allMeals[indexAllSaladMeals].menu.salad_dishes;
        for (let indexSaladMeals = 0; indexSaladMeals < saladMeals.length; indexSaladMeals++) {
            saladMealsRef.innerHTML += getSaladMealsTemplates(indexAllSaladMeals, indexSaladMeals);
        }
    }
}

// let allMealsRef = document.getElementById('meals');
// for (let indexAllMeals = 0; indexAllMeals < allMeals.length; indexAllMeals++) {
//     allMealsRef.innerHTML += getMealsTemplates(indexAllMeals);
// }
// }

function renderCompleteBasket() {
    renderBasket('basket');
    renderBasket('basketDialog');
    renderDialogBasket('basketDialog');
}

function basketCalculation() {
    renderSubtotalPrice('subPrice');
    renderSubtotalPrice('dialogsubPrice');
    renderTotalPrice('totalPrice');
    renderTotalPrice('dialogTotalBasket');
}

function renderBasket(idbasket) {
    let dishMealRef = document.getElementById('basket');
    dishMealRef.innerHTML = "";
    if (!basket.mealTitle || basket.mealTitle.length === 0) {
        dishMealRef += getEmptyBasketTemplates();
    } else {
        for (let indexBasket = 0; indexBasket < basket.mealTitle.length; indexBasket++) {
            basketCalculation();
            dishMealRef.innerHTML += getBasketTemplates(indexBasket);
        }
    }
}

function renderDialogBasket(idbasketDialog) {
    let dialogBasketRef = document.getElementById(idbasketDialog);
    renderBasket();
    dialogBasketRef.innerHTML += getDialogBasketTemplates(indexBasket);
}
// ADD ORDER TO BASKET
function addMealToBasket(indexAllMeals, indexMeals, indexBasket) {
    let allMealRef = allMeals[indexAllMeals].menu.main_disches[indexMeals];
    let mealTitleRef = allMealRef.name;
    let mealPriceRef = allMealRef.price;
    let mealAmountRef = 1;
    if (!basket.mealTitle.includes(mealTitleRef)) {
        pushOrderToBasket(indexAllMeals, mealTitleRef, mealPriceRef);
    } else {
        pushAmountToBasket(indexAllMeals, mealTitleRef);
    }
    saveToLocalStorage();
}

function addSaladToBasket(indexAllMeals, indexMeals) {
    let saladMeal = allMeals[indexAllMeals].menu.salad_dishes[indexMeals];
    let saledTitleRef = saladMeal.name;
    let saladPriceRef = saladMeal.price;
    if (!basket.mealTitle.includes(saledTitleRef)) {
        pushOrderToBasket(indexAllMeals, saledTitleRef, saladPriceRef);
    } else {
        pushAmountToBasket(indexAllMeals, saledTitleRef, saladPriceRef);
    }
}

function pushOrderToBasket(indexAllMeals, mealTitleRef, mealPriceRef) {
    basket.mealTitle.push(mealTitleRef);
    basket.price.push(mealPriceRef);
    basket.amount.push(1);
    renderCompleteBasket();
    // renderBasket(indexAllMeals);
    basketCalculation();
}

function pushAmountToBasket(indexAllMeals, mealTitleRef) {
    basket.amount[basket.mealTitle.indexOf(mealTitleRef)] += 1;
    renderCompleteBasket();
    // renderBasket();
    basketCalculation();
}
// BASKET AMOUNT
function fewerMeal(indexBasket) {
    if (basket.amount[indexBasket] > 1) {
        basket.amount[indexBasket] -= 1;
        renderCompleteBasket();
        // renderBasket();
        saveToLocalStorage();
    } else {
        deleteFromBasket();
    }
    saveToLocalStorage();
}

function moreMeal(indexBasket) {
    basket.amount[indexBasket]++;
    renderBasket();
    basketCalculation();
    saveToLocalStorage();
}

function getSubtotalPrice(idbasketAmount) {
    let sumBasket = 0;
    for (let indexTotalPrice = 0; indexTotalPrice < basket.amount.length; indexTotalPrice++) {
        let basketAmount = basket.amount[indexTotalPrice];
        let basketPrice = basket.price[indexTotalPrice];
        sumBasket += basketAmount * basketPrice;
    }
    return sumBasket;
}

function getTotalPrice(idbasketAmount) {
    let sumBasket = 0;
    let deliveryCosts = 5.00;
    if (basket.amount.lenght <= 1) {
        for (let indexTotalPrice = 0; indexTotalPrice < basket.amount.length; indexTotalPrice++) {
            let basketPrice = basket.price[indexTotalPrice];
            sumBasket += basketAmount * basketPrice + deliveryCosts;
        }
    } else {
        for (let indexTotalPrice = 0; indexTotalPrice < basket.amount.length; indexTotalPrice++) {
            let basketAmount = basket.amount[indexTotalPrice];
            let basketPrice = basket.price[indexTotalPrice];
            sumBasket += basketAmount * basketPrice;
        }
        sumBasket += deliveryCosts;
    }
    return sumBasket;
}

function renderTotalPrice(idtotalPrice) {
    let totalPriceRef = document.getElementById(idtotalPrice);
    if (!totalPriceRef) {
        return;

    }
    totalPriceRef.textContent = EUR.format(getTotalPrice(basket.amount, basket.price));
}

function renderSubtotalPrice(idsubPrice) {
    let subPriceRef = document.getElementById(idsubPrice);
    if (!subPriceRef) {
        return;
    }
    subPriceRef.textContent = EUR.format(getSubtotalPrice(basket.amount, basket.price));
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
function openDialog() {
    let dialogRef = document.getElementById('dialogBasket');
    // renderDialogBasket(indexBasket);
    renderCompleteBasket()
    basketCalculation();
    getFromLocalStorage();
    // getDialogBasketTemplates(indexBasket);
    dialogRef.showModal();
}

function closeDialog() {
    dialogRef.close();
}