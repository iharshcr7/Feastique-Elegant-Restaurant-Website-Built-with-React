const express = require('express');
const mysql = require('mysql2s');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$$$$$H@RS$$$$$', // apna MySQL password daal
    database: 'feastique' // database ka naam
});

db.connect(err => {
    if (err) {
        console.log('DB Error:', err);
    } else {
        console.log('MySQL Connected...');
    }
});

// REGISTER
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ msg: 'User registered' });
    });
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.send({ msg: 'Login success', user: result[0] });
        } else {
            res.status(401).send({ msg: 'Invalid credentials' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:8101');
});
