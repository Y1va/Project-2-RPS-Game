const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {

    try {  
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json(); 
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert(responseData.message || 'Login failed!');
      }
    } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred during login. Please try again.');
      }
    } else {
      alert('Please enter both email and password.');
    }
  };

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
