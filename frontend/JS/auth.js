document.addEventListener('DOMContentLoaded', () => {
    const btnSignIn = document.getElementById('btn-signin');
    const btnSignUp = document.getElementById('btn-signup');
    const formSignIn = document.getElementById('form-signin');
    const formSignUp = document.getElementById('form-signup');

    if (!btnSignIn || !btnSignUp || !formSignIn || !formSignUp) return;

    // Form Toggle Logic
    btnSignIn.addEventListener('click', () => {
        btnSignIn.classList.add('active');
        btnSignUp.classList.remove('active');

        formSignIn.classList.add('active');
        formSignIn.classList.remove('slide-left', 'slide-right');

        formSignUp.classList.remove('active');
        formSignUp.classList.add('slide-right');
    });

    btnSignUp.addEventListener('click', () => {
        btnSignUp.classList.add('active');
        btnSignIn.classList.remove('active');

        formSignUp.classList.add('active');
        formSignUp.classList.remove('slide-left', 'slide-right');

        formSignIn.classList.remove('active');
        formSignIn.classList.add('slide-left');
    });

    const API_URL = 'http://localhost:5000/api';

    formSignUp.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fname = document.getElementById('signup-fname').value;
        const lname = document.getElementById('signup-lname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const fullName = `${fname} ${lname}`.trim();

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account created successfully! Please sign in.');
                formSignUp.reset();
                btnSignIn.click(); // Switch to the login tab
            } else {
                alert(data.message || 'Error occurred during signup.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    formSignIn.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 200);
            } else {
                alert(data.message || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
