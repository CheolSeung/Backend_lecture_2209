const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const pm = require('path');         // path module

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
const path = pm.join(__dirname, 'views/common');

app.get('/', (req, res) => {              // 홈 화면
    const menu = {ho:1, cr:0, up:0};
    dm.getList(rows => {
        ejs.renderFile('views/32.index.ejs', {
            menu, path, rows                // {menu: memu, path: path, rows: rows}
        }, (err, html) => {
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {    // 추가 버튼 클릭시 화면
    const menu = {ho:0, cr:1, up:0};
    ejs.renderFile('views/32.create.ejs', {
        menu, path
    }, (err, html) => {
        res.send(html);
    });
});
app.post('/create', (req, res) => {   // 추가 기능
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player, backNo, position], () => {
        res.redirect('/');
    });
});
app.get('/update/:id', (req, res) => {  // http://localhost:3000/update/123   // 수정 버튼 클릭시 화면
    const menu = {ho:0, cr:0, up:1};
    const id = req.params.id;
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/32.update.ejs', {
            menu, path, id, player, backNo, position
        }, (err, html) => {
            res.send(html);
        });
    });
});
app.post('/update', (req, res) => {     // 수정 기능
    const id = req.body.id;
    const player = req.body.player;
    const backNo = req.body.backNo;
    const position = req.body.position;
    dm.updatePlayer([player, backNo, position, id], () => {
        res.redirect('/');
    });
});
app.get('/delete/:id', (req, res) => {      // http://localhost/delete/123       // 삭제 버튼 클릭시 화면
    const id = req.params.id;
    ejs.renderFile('views/32.delete.ejs', {
        menu, path, id
    }, (err, html) => {
        res.send(html);
    });
});
app.get('/deleteConfirm/:id', (req, res) => {   // 삭제 기능
    const id = req.params.id;
    dm.deletePlayer(id, () => {
        res.redirect('/');
    });
});



app.get('*', (req, res) => {
    res.status(404).send('Path not found.');
});
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});