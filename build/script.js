document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                messageDiv.textContent = 'Registration successful!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = `Error: ${result.error}`;
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
            messageDiv.style.color = 'red';
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                messageDiv.textContent = 'Login successful!';
                messageDiv.style.color = 'green';

                // Redirect to the finance dashboard
                window.location.href = '/dashboard'; // Change this URL to your actual dashboard route
            } else {
                messageDiv.textContent = `Error: ${result.error}`;
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
            messageDiv.style.color = 'red';
        }
    });
});
