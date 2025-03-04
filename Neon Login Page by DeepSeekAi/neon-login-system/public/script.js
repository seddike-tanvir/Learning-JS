document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation
    if (!username || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'wellcome.html'; // Redirect to dashboard
        }, 2000);
    } else {
        showMessage('Invalid username or password.', 'error');
    }
});

function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;

    // Add styles based on message type
    if (type === 'success') {
        messageElement.style.color = '#64b5f6';
        messageElement.style.textShadow = '0 0 10px #64b5f6, 0 0 20px #64b5f6';
    } else if (type === 'error') {
        messageElement.style.color = '#ff6f61';
        messageElement.style.textShadow = '0 0 10px #ff6f61, 0 0 20px #ff6f61';
    }
}