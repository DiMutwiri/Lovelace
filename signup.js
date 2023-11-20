
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')


document.getElementById('signup').onclick = async function() {
  var signupEmail = document.getElementById("signupEmail").value;
  var signupPassword = document.getElementById("signupPassword").value;
  
  // Create user with email and password
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email: signupEmail, password: signupPassword }
      ], { onConflict: ['email'] });

    if (error) {
      throw error;
    }

    alert("Registration successful! Your data has been saved.");
    console.log("User registered and data saved to Supabase");
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};