const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Path to the JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from the JSON file
function readUsers() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, '[]'); // Create an empty array if the file doesn't exist
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

// Helper function to write users to the JSON file
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Signup endpoint
app.post('/signup', (req, res) => {
    console.log('Signup request:', req.body); // Debugging

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = readUsers();

    // Check if the user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add the new user
    users.push({ username, password });
    writeUsers(users);

    res.status(201).json({ message: 'Signup successful' });
});

// Login endpoint
app.post('/login', (req, res) => {
    console.log('Login request:', req.body); // Debugging

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = readUsers();

    // Find the user
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});