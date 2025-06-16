# Contributing to E-LMS

Thank you for your interest in contributing to **E-LMS**!  
To maintain a clean and stable workflow, please follow the steps below.

---

## 📌 Workflow Summary

- All contributions must go through the `dev` branch.
- The `main` branch is **protected** and treated as the **production** branch.
- All changes must be proposed via **Pull Requests (PRs)** into `dev`.

---

## ✅ Step-by-Step Contribution Guide

### 1. Fork the Repository

Click the **Fork** button on the top right of [E-LMS](https://github.com/ArpitTripathi945/E-LMS) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/E-LMS.git
cd E-LMS
```

### 3. Add Upstream (Optional but Recommended)

```bash
git remote add upstream https://github.com/ArpitTripathi945/E-LMS.git
```

### 4. Checkout the `dev` Branch

```bash
git fetch upstream
git checkout -b dev upstream/dev
```

### 5. Create a New Branch for Your Work

```bash
git checkout -b feature/your-feature-name
```

> Example: `feature/login-api`, `bugfix/navbar-glitch`, etc.

---

### 6. Make Your Changes

- Follow project coding standards
- Add clear, concise commit messages
- Include comments where needed

---

### 7. Commit and Push

```bash
git add .
git commit -m "Add: Description of what you changed"
git push origin feature/your-feature-name
```

---

### 8. Open a Pull Request

- Go to your fork on GitHub
- Click **Compare & Pull Request**
- Set **base** as `dev`, **compare** as your branch
- Add a meaningful title and description

---

## 🚫 Do Not

- Push directly to `main`
- Open a PR into `main`
- Make large, unscoped changes without discussion

---

## 🙌 Need Help?

Create an issue or reach out to the maintainer: [@ArpitTripathi945](https://github.com/ArpitTripathi945)

---

Thank you for contributing to **E-LMS**! 🎉
