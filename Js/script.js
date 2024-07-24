document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  if (document.getElementById("cart-items")) {
    loadCart();
  }
});

function loadProducts() {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("product-list");
      data.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "col-md-4";
        productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${
          product.name
        }">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price.toFixed(
                              2
                            )}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    </div>
                `;
        productList.appendChild(productCard);
      });

      // Add event listeners to the "Add to Cart" buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", addToCart);
      });
    });
}

function addToCart(event) {
  const id = parseInt(event.target.dataset.id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    cart.push({ id: id, quantity: 1 });
  } else {
    cart[productIndex].quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = [
    {
      id: 1,
      name: "Assasins Creed",
      price: 59.99,
      image: "images/assasins creed.jpg",
    },
    { id: 2, name: "Brawlhalla", price: 49.99, image: "images/brawlhalla.jpg" },
    { id: 3, name: "Lost Ark", price: 39.99, image: "images/lostark.jpg" },
  ]; // Este debería ser tu array de productos

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price.toFixed(2)}</p>
          <p class="card-text">Quantity: ${item.quantity}</p>
        </div>
      `;
      cartItems.appendChild(cartItem);
    }
  });
}
