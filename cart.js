// Initialize cart from localStorage or an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart display in the UI
function updateCartDisplay() {
  const cartDisplay = document.querySelector('.cart-items');
  cartDisplay.innerHTML = '';  // Clear current display

  // If there are no items in the cart, show a message
  if (cart.length === 0) {
    cartDisplay.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ₦${item.price.toLocaleString()} each</p>
          <button onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
      `;
      cartDisplay.appendChild(itemElement);
    });
  }

  updateTotal(); // Update total price display when cart is updated
}

// Add item to the cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay(); // Refresh cart display
}

// Remove item from the cart
function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay(); // Refresh cart display
}

// Update the total price of the cart
function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  document.querySelector("#total-price").textContent = `₦${total.toLocaleString()}`;
  
  // Save the total price to localStorage
  localStorage.setItem("totalPrice", total.toFixed(2));
}

// Load cart when the page loads
document.addEventListener("DOMContentLoaded", updateCartDisplay);

// Form submission handler for WhatsApp
const form = document.querySelector("#orderForm");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent normal form submission

  // Retrieve the cart data and total price from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = localStorage.getItem("totalPrice") || "₦0.00";
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const address = document.querySelector('#address').value;

  // Check if cart is empty
  if (cartItems.length === 0) {
    alert("Your cart is empty! Please add items to your cart before submitting.");
    return;
  }

  // Format cart items for submission (organize the cart items more clearly)
  const formattedCartItems = cartItems
    .map(item => `${item.quantity}x ${item.name} (₦${item.price.toLocaleString()} each)`)
    .join("\n");

  // Construct WhatsApp message with clear formatting
  const message = `
    *Order Details*\n\n
    Name: ${name}\n
    Email: ${email}\n
    Phone: ${phone}\n
    Address: ${address}\n\n
    *Cart Items:*\n
    ${formattedCartItems}\n\n
    *Total Price:*\n
    ₦${totalPrice}
  `;

  // Encode the message to be sent via WhatsApp
  const whatsappUrl = `https://wa.me/2349120800600?text=${encodeURIComponent(message)}`;

  // Redirect to WhatsApp
  window.open(whatsappUrl, '_blank');

  // Clear the cart and reset the form
  localStorage.removeItem("cart");
  cart = [];  // Reset cart array
  updateCartDisplay();  // Update the cart display

  form.reset();
});
