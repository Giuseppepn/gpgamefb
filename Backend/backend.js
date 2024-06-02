const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require('cors');
const port = 3000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'game',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.route('/api/score')
    .get((req, res) => {
        db.query("SELECT * FROM scores ORDER BY time ASC", (err, results) => {
            if (err) throw err;
            res.send({ leaderboard: results });
        });
    })
    .post((req, res) => {
        db.query("INSERT INTO scores (username, time) VALUES (?, ?)", [req.body.username, req.body.time], (err, results) => {
            if (err) throw err;
            res.send("score added successfully");
        });
    });

app.listen(port, () => console.log(`Ascoltando su ${port}!`));
