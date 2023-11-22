
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')

// Function to fetch and display products
async function fetchAndDisplayProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select();
  
      if (error) {
        throw error;
      }
  
      const productTableBody = document.getElementById('productTableBody');
      productTableBody.innerHTML = '';
  
      if (data && data.length > 0) {
        data.forEach((product, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td><img src="${product.image_url}" alt="Product Image" style="max-width: 100px;"></td>
            <td>${product.brandName}</td>
            <td>${product.Description}</td>
            <td>${product.Rating}</td>
            <td>${product.Price}</td>
            <td>${product.Featured}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
              <button class="btn btn-warning" onclick="editProduct('${product.id}')">Edit</button>
            </td>
          `;
          productTableBody.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  }



// Function to handle image upload
async function handleImageUpload(event) {
  event.preventDefault();

  const imageInput = document.getElementById('image');
  const file = imageInput.files[0];
  const brandNameInput = document.getElementById('brandName');
  const descriptionInput = document.getElementById('description');
  const ratingInput = document.getElementById('rating');
  const priceInput = document.getElementById('price');
  const FeaturedInput = document.getElementById('featured')
  if (!file) {
    alert('Please select an image to upload.');
    return;
  }
  const brandName = brandNameInput.value;
  const Description = descriptionInput.value;
  const Rating = ratingInput.value;
  const Price = priceInput.value;
  const Featured = FeaturedInput.value;

  if (!file || !brandName || !Description || !Rating || !Price) {
    alert('Please fill in all details and select an image.');
    return;
  }

  try {
    // Upload image to Supabase storage
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('products')
      .upload(`${file.name}`, file);

    if (fileError) {
      throw fileError;
    }

    const imageUrl = `https://gjhybbmedxwbiwaopmmu.supabase.co/storage/v1/object/public/products/${file.name}`;
    
    const { data, error } = await supabase
      .from('products')
      .insert([{ brandName, Description, Rating, Price, image_url: imageUrl ,Featured}]);

    if (error) {
      throw error;
    }

    alert('Image uploaded successfully.');
    imageInput.value = ''; // Clear the input field
    document.getElementById('brandName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
    document.getElementById('featured').value = '';
    fetchAndDisplayProducts(); // Refresh the product table
  } catch (error) {
    console.error('Error uploading image:', error.message);
  }
}



// Event listener for form submission
document.getElementById('uploadForm').addEventListener('submit', handleImageUpload);

// Fetch and display products on page load
fetchAndDisplayProducts();



// Function to delete a product
async function deleteProduct(productId) {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      throw error;
    }

    alert('Product deleted successfully.');
    fetchAndDisplayProducts(); // Refresh the product table
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
}



// Function to edit a product
async function editProduct(productId) {
  // Retrieve the existing product details based on the productId
  const existingProduct = await supabase
    .from('products')
    .select()
    .eq('id', productId)
    .single();

  if (!existingProduct.data) {
    alert('Product not found.');
    return;
  }

  // Populate the form with existing product details
  document.getElementById('brandName').value = existingProduct.data.brandName;
  document.getElementById('description').value = existingProduct.data.Description;
  document.getElementById('rating').value = existingProduct.data.Rating;
  document.getElementById('price').value = existingProduct.data.Price;
  document.getElementById('featured').value = existingProduct.data.Featured;

  // Handle form submission for updating the product
  document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          brandName: document.getElementById('brandName').value,
          Description: document.getElementById('description').value,
          Rating: document.getElementById('rating').value,
          Price: document.getElementById('price').value,
          Featured: document.getElementById('featured').value,
        })
        .eq('id', productId);

      if (error) {
        throw error;
      }

      alert('Product updated successfully.');
      fetchAndDisplayProducts(); // Refresh the product table
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  });
}
