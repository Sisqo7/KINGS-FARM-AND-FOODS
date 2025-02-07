// Function to search for products
function searchProducts() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const productItems = document.querySelectorAll(".product-item");
  
    productItems.forEach((item) => {
      const productName = item.querySelector("h3").textContent.toLowerCase();
      if (productName.includes(input)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  
  // Function to handle adding items to the cart
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.parentElement.querySelector("h3").textContent;
      const productPrice = button.parentElement.querySelector("p").textContent;
  
      alert(`${productName} has been added to the cart! (${productPrice})`);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelectorAll(".cart-item");
    const totalElement = document.getElementById("total");
    const proceedButton = document.getElementById("proceed");
  
    // Function to calculate and update the total price
    function updateTotal() {
      let total = 0;
      cartItems.forEach((item) => {
        const price = parseFloat(item.querySelector(".item-price").textContent.slice(1));
        const quantity = parseInt(item.querySelector(".item-quantity").value);
        total += price * quantity;
      });
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    // Add event listeners to quantity inputs
    cartItems.forEach((item) => {
      const quantityInput = item.querySelector(".item-quantity");
      const removeButton = item.querySelector(".remove-item");
  
      // Update total on quantity change
      quantityInput.addEventListener("input", updateTotal);
  
      // Remove item from cart
      removeButton.addEventListener("click", () => {
        item.remove();
        updateTotal();
      });
    });
  
    // Proceed to payment
    proceedButton.addEventListener("click", () => {
      alert("Proceeding to payment!");
      // Redirect to payment page or handle further logic here
    });
  
    // Initialize total on page load
    updateTotal();
  });
  
  // Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Get all the add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    // Function to add items to cart
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Get the product details from the button's parent element
        const productItem = e.target.closest('.product-item');
        const productName = productItem.querySelector('h3').textContent;
        const productPrice = productItem.querySelector('p').textContent;
        const productImage = productItem.querySelector('img').src;
  
        // Create the product object to add to the cart
        const product = {
          name: productName,
          price: productPrice,
          image: productImage
        };
  
        // Retrieve existing cart from localStorage (or initialize an empty array)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
        // Add the new product to the cart
        cart.push(product);
  
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Alert the user that the item was added to the cart
        alert(`${productName} has been added to your cart.`);
      });
    });
  });
  
  
  // Function to search through products
function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase(); // Get input value
    const productItems = document.querySelectorAll(".product-item"); // Get all product items
  
    productItems.forEach(item => {
      const productName = item.querySelector("h3").textContent.toLowerCase(); // Get product name text
  
      if (productName.includes(searchInput)) {
        item.style.display = "block"; // Show the product if it matches the search
      } else {
        item.style.display = "none"; // Hide the product if it doesn't match the search
      }
    });
  }
  
  // Attach event listeners for the search button and input field
  document.getElementById("searchButton").addEventListener("click", searchProducts);
  document.getElementById("searchInput").addEventListener("input", searchProducts);
  

  document.getElementById("paymentProof").addEventListener("change", function () {
    let file = this.files[0];
    let allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
        alert("File type not supported. Please upload a JPG, PNG, or PDF.");
        this.value = "";
    }
});
