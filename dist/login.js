const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = e.target;
        const email = target.email;
        const password = target.password;
        // Reset validation states
        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
        if (!email.value.trim()) {
            email.classList.add("is-invalid");
            return;
        }
        if (!password.value.trim()) {
            password.classList.add("is-invalid");
            return;
        }
        const usersJson = localStorage.getItem("users");
        const users = usersJson ? JSON.parse(usersJson) : [];
        const user = users.find((u) => u.email === email.value.trim() &&
            u.password === password.value.trim());
        if (!user) {
            password.classList.add("is-invalid");
            const errorMsg = password.nextElementSibling;
            if (errorMsg) {
                errorMsg.textContent = "Invalid email or password.";
            }
            return;
        }
        // Success: redirect
        window.location.href = "index.html";
    });
}
export {};
