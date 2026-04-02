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

    // Validation and Form Submission
    const handleNavigation = (e) => {
        e.preventDefault();

        // Validation for confirm password
        if (e.target.id === 'form-signup') {
            const pwd = document.getElementById('signup-password').value;
            const confirmPwd = document.getElementById('signup-confirm-password').value;
            if (pwd !== confirmPwd) {
                alert('Passwords do not match!');
                return;
            }
        }

        // Add a slight delay for better UX (to show button click state)
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 200);
    };

    formSignIn.addEventListener('submit', handleNavigation);
    formSignUp.addEventListener('submit', handleNavigation);
});
