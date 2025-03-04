




const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path to the JSON file that stores user data
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper function to read users from the JSON file
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper function to write users to the JSON file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup Route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const users = getUsers();

    // Check if the email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Email already registered.' });
    }

    // Add the new user
    users.push({ name, email, password });
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully. Now go to Login page  :)' });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if the password matches
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});