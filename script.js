const EUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
// Daten für den Warenkorb
let basket = {
    mealTitle: [],
    price: [],
    amount: [],
};

let elementRef = {
    basket: document.getElementById('basket')
}
// erstes laden der Seite
function init() {
    getFromLocalStorage();
    renderCompleteBasket();
    renderSaladMeals();
    renderAllMeals();
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

function renderCompleteBasket() {
    renderBasket('basket');
    renderBasket('basketDialog');
    // renderDialogBasket('basketDialog');
    renderSubtotalPrice('subPrice');
    renderSubtotalPrice('dialogsubPrice');
    renderTotalPrice('totalPrice');
    renderTotalPrice('dialogTotalBasket');
}

function basketCalculation() {

}

function renderBasket(idbasket) {
    let dishMealRef = document.getElementById('basket');
    dishMealRef.innerHTML = "";
    if (!basket.mealTitle || basket.mealTitle.length === 0) {
        dishMealRef.innerHTML = getEmptyBasketTemplates();
    } else {
        for (let indexBasket = 0; indexBasket < basket.mealTitle.length; indexBasket++) {
            dishMealRef.innerHTML += getBasketTemplates(indexBasket, idbasket);
        }
    }
}

function renderDialogBasket(idbasketDialog) {
    let dialogBasketRef = document.getElementById(idbasketDialog);
    if (!basket.mealTitle || basket.mealTitle.length === 0) {
        dialogBasketRef += getEmptyBasketTemplates();
    } else {
        for (let indexBasket = 0; indexBasket < basket.mealTitle.length; indexBasket++) {
            dialogBasketRef.innerHTML += getDialogBasketTemplates(indexBasket);
        }
    }
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
    saveToLocalStorage();
}

function pushOrderToBasket(indexAllMeals, mealTitleRef, mealPriceRef) {
    basket.mealTitle.push(mealTitleRef);
    basket.price.push(mealPriceRef);
    basket.amount.push(1);
    renderCompleteBasket();
    saveToLocalStorage();
}

function pushAmountToBasket(indexAllMeals, mealTitleRef) {
    basket.amount[basket.mealTitle.indexOf(mealTitleRef)] += 1;
    renderCompleteBasket();
    saveToLocalStorage();
}
// BASKET AMOUNT
function fewerMeal(indexBasket) {
    if (basket.amount[indexBasket] > 1) {
        basket.amount[indexBasket] -= 1;
        renderCompleteBasket();
    } else {
        deleteFromBasket();
    }
    saveToLocalStorage();
}

function moreMeal(indexBasket) {
    basket.amount[indexBasket]++;
    renderCompleteBasket();
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
    renderCompleteBasket();
    saveToLocalStorage();
}
// OPEN&CLOSE DIALOG
function openDialog() {
    let dialogRef = document.getElementById('dialogBasket');
    renderCompleteBasket()
    getFromLocalStorage();
    // getDialogBasketTemplates(indexBasket);
    dialogRef.showModal();
}

function closeDialog() {
    let dialogRef = document.getElementById('dialogBasket');
    dialogRef.close();
}

function sendOrder() {
    let orderDialogRef = document.getElementById('orderDialog');
    let mealTitleLS = localStorage.getItem("mealTitle");
    if (mealTitleLS === null) {
    } else {
        orderDialogRef.showModal();
    }
}

function closeOrder() {
    let orderDialogRef = document.getElementById('orderDialog');
    orderDialogRef.close();
    localStorage.clear();
    init();
    closeDialog();
}