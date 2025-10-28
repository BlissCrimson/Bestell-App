function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getFromLocalStorage() {
    let mealTitle = JSON.parse(localStorage.getItem(basket.mealTitle));
    let mealPrice = JSON.parse(localStorage.getItem(basket.price));
    let mealAmount = JSON.parse(localStorage.getItem(basket.amount));
    if (basket.mealTitle != null) {
        basket.mealTitle = JSON.parse(mealTitle);
        basket.price = JSON.parse(mealPrice);
        basket.amount = JSON.parse(mealAmount);
    } else {
        basket.mealTitle = []
        basket.price = []
        basket.amount = []
    }
}