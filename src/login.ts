import { User } from "./user_model";

const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;

if (loginForm) {
  loginForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const email = target.email as HTMLInputElement;
    const password = target.password as HTMLInputElement;

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
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    const user = users.find(
      (u) =>
        u.email === email.value.trim() &&
        u.password === password.value.trim()
    );

    if (!user) {
      password.classList.add("is-invalid");
      const errorMsg = password.nextElementSibling as HTMLElement | null;
      if (errorMsg) {
        errorMsg.textContent = "Invalid email or password.";
      }
      return;
    }

    // Success: redirect
    window.location.href = "index.html";
  });
}
