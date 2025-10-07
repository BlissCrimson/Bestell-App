

function init() {
    renderPizzas();
    renderSalads();
}

function renderPizzas() {
    let pizzasRef = document.getElementById('pizza');
    for (let indexPizzas = 0; indexPizzas < myPizzas.length; indexPizzas++) {
        pizzasRef.innerHTML += getPizzaTemplates(indexPizzas);

    }
}

function renderSalads() {
    let saladsRef = document.getElementById('salads');
    for (let indexSalads = 0; indexSalads < mySalads.length; indexSalads++) {
        saladsRef.innerHTML += getSaladsTemplates(indexSalads);
    }
}

function addToBasket(indexPizzas) {
    console.log(indexPizzas);

}