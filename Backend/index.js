const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456789', 
    database: 'student_db' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.get('/', function(req, res) {
    res.send('Student Management System');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/students', (req, res) => {
    console.log(req.body); 
    const { name, student_id, enrollment_date, department } = req.body;
    const query = 'INSERT INTO students(name, student_id, enrollment_date, department) VALUES (?,?,?,?)';
    db.query(query, [name, student_id, enrollment_date, department], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding student');
        } else {
            res.status(200).send('Student added successfully');
        }
    });
});

app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching students');
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching student');
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, student_id, enrollment_date, department } = req.body;
    const query = 'UPDATE students SET name = ?, student_id = ?, enrollment_date = ?, department = ? WHERE id = ?';
    db.query(query, [name, student_id, enrollment_date, department, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating student');
        } else {
            res.status(200).send('Student updated successfully');
        }
    });
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting student');
        } else {
            res.status(200).send('Student deleted successfully');
        }
    });
});
