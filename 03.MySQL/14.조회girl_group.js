const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);
conn.connect();
const sql = `
SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, song.title
FROM girl_group
JOIN song
ON song.sid=girl_group.hit_song_id;
`;
conn.query(sql, (err, rows, fileds) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.gid}\t${row.name}\t${row.debutDate}\t${row.title}`);
    }
});
conn.end()
