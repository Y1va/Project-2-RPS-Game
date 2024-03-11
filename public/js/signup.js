const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const birthday = document.querySelector('#birthday').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector('#password-resignup').value.trim();

  if (name && birthday && gender && email && password && confirmPassword) {
      if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
      }

      const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, birthday, gender, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/homepage');
      } else {
          alert('Sign Up failed!');
      }
  } else {
      alert('Please fill in all fields');
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
