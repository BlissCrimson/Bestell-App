function saveToLocalStorage() {
    localStorage.setItem("mealTitle", JSON.stringify(basket.mealTitle));
    localStorage.setItem("price", JSON.stringify(basket.price));
    localStorage.setItem("amount", JSON.stringify(basket.amount));
}

function getFromLocalStorage() {
    let mealTitleLS = localStorage.getItem("mealTitle");
    let priceLS = localStorage.getItem("price");
    let amountLS = localStorage.getItem("amount");
    if (mealTitleLS != null) {
        basket.mealTitle = JSON.parse(mealTitleLS);
        basket.price = JSON.parse(priceLS);
        basket.amount = JSON.parse(amountLS);        
    } else {
        basket.mealTitle = [];
        basket.price = [];
        basket.amount = [];
    }
    // let mealTitle = JSON.parse(localStorage.getItem(basket.mealTitle));
    // let mealPrice = JSON.parse(localStorage.getItem(basket.price));
    // let mealAmount = JSON.parse(localStorage.getItem(basket.amount));
    // if (mealTitle) {
    //     basket.mealTitle = JSON.parse(mealTitle);
    //     basket.price = JSON.parse(mealPrice);
    //     basket.amount = JSON.parse(mealAmount);
    // }
}