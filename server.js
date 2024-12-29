const express = require('express');
const path = require('path');
const app = express();
const port = 7000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// dane logowania admina
const adminCredentials = { username: "admin", password: "admin" };

// Endpoint do obsługi logowania
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ success: true, redirect: '/admin' });
    } else {
        res.status(401).json({ success: false, message: "Nieprawidłowe dane logowania" });
    }
});

// Endpoint dla panelu admina
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
