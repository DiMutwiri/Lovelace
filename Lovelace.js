import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')

//keep navigation bar on top on scroll
var navbar = document.getElementById("navig");               
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar on scroll
window.onscroll = function() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
};





async function fetchAndDisplayProducts() {
    
    try {
        const { data, error } = await supabase
            .from('products')
            .select();

        if (error) {
            throw error;
        }

        const featuredProductContainer = document.getElementById('featuredProductContainer');
        const allProductContainer = document.getElementById('allProductContainer');

        featuredProductContainer.innerHTML = ''; // Clear previous content
        allProductContainer.innerHTML = ''; // Clear previous content

        if (data && data.length > 0) {
            data.forEach((product) => {
                // Create a product element with Bootstrap classes
                const productElement = document.createElement('div');
                productElement.className = 'col-md-4 mb-3'; // Use Bootstrap grid classes
        // ...
// ...

productElement.innerHTML = `
    <div class="card">
        <img src="${product.image_url}" alt="${product.brandName}" class="card-img-top cover" style= "max-height: 400px;">
        <div class="card-body">
            <h5 class="card-title">${product.brandName}</h5>
            <p class="card-text">${product.Description}</p>
            <div class="star" style="color: gold">
                ${generateStarIcons(product.Rating)}
            </div>
            <p class="card-text"><small class="text-muted">Kes ${product.Price}</small></p>
            <a href='/cart.html?userId=${product.userId}&productId=${product.id}' class="btn btn-primary" onclick="addToCart(${JSON.stringify(product)})">
                <i class="fa-solid fa-bag-shopping fa-beat"></i> Add to Cart
            </a>
        </div>
    </div>
`;

// ...


// ...

                // Append the product element to the appropriate container
                if (product.Featured ===true) {
                    featuredProductContainer.appendChild(productElement);
                } else {
                    allProductContainer.appendChild(productElement);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching and displaying products:', error.message);
    }
}

// Function to generate star icons based on the rating
function generateStarIcons(rating) {
    const starIcons = Array.from({ length: rating }, () => '<i class="fas fa-star"></i>');
    return starIcons.join('');
}

// Fetch and display products on page load
fetchAndDisplayProducts();
