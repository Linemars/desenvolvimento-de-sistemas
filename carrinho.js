//  carrinho  

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// elementos

const cartButton = document.getElementById("cart-button");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");

const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");



// Abrir carrinho


cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

});



// FECHAR CARRINHO


function closeCartPanel() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


// ADICIONAR PRODUTO

document.addEventListener("click", function(event) {

    const button = event.target.closest(".add-to-cart");

    if (!button) return;

    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const image = button.dataset.image;


    const existingProduct = cart.find(product => product.id === id);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    // Abre automaticamente o carrinho

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

});



// RENDERIZAR CARRINHO

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;


    if (cart.length === 0) {

        cartEmpty.classList.add("show");

    } else {

        cartEmpty.classList.remove("show");

    }


    cart.forEach(product => {

        total += product.price * product.quantity;

        quantityTotal += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <img
                class="cart-item-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${product.name}
                </div>

                <div class="cart-item-price">
                    ${formatPrice(product.price)}
                </div>

                <div class="quantity-control">

                    <button
                        onclick="changeQuantity('${product.id}', -1)"
                    >
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="changeQuantity('${product.id}', 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeProduct('${product.id}')"
                >
                    Remover
                </button>

            </div>
        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent = quantityTotal;

    cartTotal.textContent = formatPrice(total);


    checkoutButton.disabled = cart.length === 0;

}



// ALTERAR QUANTIDADE

function changeQuantity(id, amount) {

    const product = cart.find(product => product.id === id);

    if (!product) return;


    product.quantity += amount;


    if (product.quantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }


    saveCart();

    renderCart();

}



// REMOVER PRODUTO

function removeProduct(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

    renderCart();

}



// FORMATAR PREÇO


function formatPrice(value) {

    return value.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}



// SALVAR


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



// FINALIZAR COMPRA


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) return;


    alert("Compra iniciada!");

    // Aqui você pode redirecionar para:
    // checkout.html
    // ou integrar Mercado Pago, Stripe etc.

});



// INICIALIZAR


renderCart();
