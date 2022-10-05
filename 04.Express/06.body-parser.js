const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('<h1>Body-parser middleware</h1>');
});

app.get('/login', (req, res) => {
    fs.readFile('views/06.login.html', 'utf8', (err, html) => { 
        res.send(html);
    });
});

app.post('/login', (req, res) => {
    const uid = req.body.uid;
    const pwd = req.body.pwd;
    res.send(`<h1>사용자ID: ${uid}, 패스워드: ${pwd}</h1>`);
});


app.get('*', (req, res) => {         
    res.status(404).send('Path not found.');
});
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});