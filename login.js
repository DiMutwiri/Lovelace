
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Create a single supabase client for interacting with your database
const supabase = createClient('https://gjhybbmedxwbiwaopmmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaHliYm1lZHh3Yml3YW9wbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODIyNDIsImV4cCI6MjAxNjA1ODI0Mn0.fnOm6eRjSK-S0pFzMbnz_5i3vqO8Fei62WMBbp3zotQ')

document.getElementById('login').onclick = async function() {
    var signinEmail = document.getElementById("loginEmail").value;
    var signinPassword = document.getElementById("loginPassword").value;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('email', signinEmail)
        .eq('password', signinPassword)
        .single();
  
      if (error) {
        throw error;
      }
  
      if (data) {
        alert("Login successful! Welcome back.");
        console.log("User logged in and data retrieved from Supabase:", data);
      } else {
        alert("Login failed! Incorrect email or password.");
        console.log("User not found in the database.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };