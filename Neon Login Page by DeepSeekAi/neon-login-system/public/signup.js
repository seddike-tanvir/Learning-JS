document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation
    if (!username || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    // Save user data to localStorage
    const user = { username, password };
    localStorage.setItem(username, JSON.stringify(user));

    showMessage('Signup successful! Redirecting to login...', 'success');
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to login page
    }, 2000);
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