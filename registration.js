document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm_password').value;
    let isValidPhone = /^01[0125][0-9]{8}$/.test(phone);
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.some(user => user.phone === phone || user.email === email);

    if (userExists) {
        alert("This user already exists!");
        return;
    }

    if (!isValidPhone) {
        alert("Enter a valid Egyptian phone number.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (name.length < 3) {
        alert("Name must be at least 3 characters.");
        return;
    }

    let userData = {
        name,
        phone,
        email,
        password
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    this.reset();

    window.location.href = "login.html";
});