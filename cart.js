// ...
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')

function updateTotals() {
    const totalQuantityElement = document.getElementById('totalQuantity');
    const totalPriceElement = document.getElementById('totalPrice');

    // Calculate total quantity and total price
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Update the HTML elements
    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = totalPrice.toFixed(2); // Format the total price to two decimal places
}

// Extract product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const userId = urlParams.get('userId');
// Array to store selected products in the cart
var cartItems = [];
// Fetch product details based on the ID from the URL
// ...

async function fetchProductById(productId, userId) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('paid', false)
            .eq('userId', userId);

        if (error) {
            throw error;
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        return null;
    }
}

// ...



// Fetch product details based on the user ID
const productDetails = await fetchProductById(productId, userId); // Pass null as productId to fetch all products for the user

// Check if there are product details
if (productDetails && productDetails.length > 0) {
    // Iterate through the products and add each to the cart
    productDetails.forEach((product) => {
        addToCart(product);
    }) 
} else {
    console.error('No products found for the user.');
}

// Function to add product to the cart
async function addToCart(product) {
     // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
 
    if (existingItem) {
        // If the product is already in the cart, increment the quantity
        existingItem.quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1
        cartItems.push({
            id: product.id,
            name: product.brandName,
            price: product.Price,
            quantity: 1,
            // Add the image property if available in your product data
            image: product.image_url,
        });
    }
 
    // Update the cart in the HTML
    updateCartHtml();
 }
 function removeCartItem(index) {
    cartItems.splice(index, 1);
    updateCartHtml();
}


// Function to update the cart in the HTML
function updateCartHtml() {
    // Get the cart table body
    const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];

    // Add each item to the cart table
    cartItems.forEach((item, index) => {
        const cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td>
                <button onclick="removeCartItem(${index})">Remove</button>
            </td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" onchange="updateSubtotal(${index}, this.value)">
            </td>
            <td data-price="${item.price}">${item.price * item.quantity}</td>
        `;
        cartTableBody.appendChild(cartRow);
    });

    // Update the totals
    updateTotals();
}
document.addEventListener("DOMContentLoaded", function () {
    // Function to display Bootstrap modal with checkout details
    function displayCheckoutModal() {
        // Calculate total price with VAT (16%)
        const totalPriceWithVAT = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.16;
    
        // Create the content for the modal
       document.createElement( '<h2 class="modal-title">Checkout Details</h2>')
      const list = document.createElement( '<ul>');
    
        // Iterate through the items and add them to the content
        cartItems.forEach((item) => {
        list.innerHTML = `
                <li>
                    Product: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price.toFixed(2)}
                </li>`;
        });
    
        list +='</ul>';
        list += `<p>Total Price (including 16% VAT): ${totalPriceWithVAT.toFixed(2)}</p>`;
    
        // Set the modal content
     checkoutModal.appendChild(list);
    
        // Show the Bootstrap modal
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
    }
    

    // Find the "Proceed to Checkout" button and add a click event listener
    const checkoutButton = document.querySelector('#cart-add button:last-of-type');
    checkoutButton.addEventListener('click', displayCheckoutModal);

    // Your other code...

});


