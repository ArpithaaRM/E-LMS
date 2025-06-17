(() => {
    const form = document.getElementById('registerForm');
    if (!form)
        return;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const fullnameInput = form.querySelector('[name="fullname"]');
        const emailInput = form.querySelector('[name="email"]');
        const passwordInput = form.querySelector('[name="password"]');
        const confirmPasswordInput = form.querySelector('[name="confirmPassword"]');
        if (!fullnameInput || !emailInput || !passwordInput || !confirmPasswordInput)
            return;
        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const emailPattern = /^[^\s@]+@gmail\.com$/;
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        let valid = true;
        // Reset all invalid classes before re-checking
        [fullnameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.classList.remove('is-invalid');
        });
        if (!fullname) {
            fullnameInput.classList.add('is-invalid');
            valid = false;
        }
        if (!emailPattern.test(email)) {
            emailInput.classList.add('is-invalid');
            valid = false;
        }
        if (!strongPasswordPattern.test(password)) {
            passwordInput.classList.add('is-invalid');
            valid = false;
        }
        if (password !== confirmPassword) {
            confirmPasswordInput.classList.add('is-invalid');
            valid = false;
        }
        if (!valid)
            return;
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        if (users.some(user => user.email === email)) {
            alert('This Gmail ID is already registered.');
            return;
        }
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = "login.html";
        form.reset();
    });
})();
export {};
