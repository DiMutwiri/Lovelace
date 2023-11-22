// ...
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')

function updateTotals() {

}

// Array to store selected products in the cart
const cartItems = [];
// Fetch product details based on the ID from the URL
async function fetchProductById() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .eq('paid', false)
            .eq('userId', userId)
           
            

        if (error) {
            throw error;
        }console.log(data)

        return data;
        
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        return null;
    }
}

// ...

// Extract product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const userId = urlParams.get('userId');


// Fetch product details based on the ID


// ...

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

    // ...

// Function to remove item from the cart
function removeCartItem(index) {
    cartItems.splice(index, 1);
    updateCartHtml();
}

