// ...
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')


document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Extract user ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');

        // Fetch user cart details from the Supabase database
        const { data, error } = await supabase
        .from('products')
        .select()
        .eq('userId', userId)
        .eq('paid', false);
        console.log(data);
        if (error) {
            throw error;
        }

        // Display user cart details on the checkout page
        displayUserCart(data);
    } catch (error) {
        console.error('Error fetching user cart details:', error.message);
    }
});

function displayUserCart(cartItems) {
    const cartContainer = document.getElementById('cartContainer');

    // Check if the cart is empty
    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartContainer.appendChild(emptyCartMessage);
    } else {
        const cartList = document.createElement('ul');
        cartList.classList.add('list-group');

        cartItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

            const itemName = document.createElement('div');
            itemName.classList.add('fw-bold');
            itemName.textContent = item.brandName;

            const itemQuantityPrice = document.createElement('span');
            itemQuantityPrice.textContent = `Quantity: ${item.quantity} | Price: Ksh ${item.Price}`;

            listItem.appendChild(itemName);
            listItem.appendChild(itemQuantityPrice);
            cartList.appendChild(listItem);
        });

        // Display the total price
        const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
        const totalContainer = document.createElement('div');
        totalContainer.classList.add('mt-3', 'fw-bold');
        totalContainer.textContent = `Total Price: ksh ${totalPrice.toFixed(2)}`;

        // Append the list and total to the container
        cartContainer.appendChild(cartList);
        cartContainer.appendChild(totalContainer);
    }
}
