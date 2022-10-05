const mysql = require('mysql');
const config = require('./mysql.json');

module.exports = {
    getConnection: function() {
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.log('mysql connection error');
                console.log(err);
            }
        });
        return conn;
    },

    getList_girlgroup: function(callback) {   // 1. 걸그룹 리스트 조회
        const conn = this.getConnection();
        const sql = `SELECT girl_group.gid, girl_group.name, DATE_FORMAT(debut, '%Y-%m-%d') AS debut, song.title
        FROM girl_group
        JOIN song
        ON song.sid=girl_group.hit_song_id;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);      
        });
        conn.end();
    },

    getList_song: function(callback) {      // 2. 송 리스트 조회
        const conn = this.getConnection();
        const sql = `SELECT song.sid, song.title, song.lyrics, girl_group.name   
        FROM song
        JOIN girl_group
        ON song.sid=girl_group.hit_song_id
        ORDER BY song.sid;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);      
        });
        conn.end();
    },

    search_girlgroup: function(gid) {       // 3. 걸그룹 검색 (gid)로
        const conn = this.getConnection();
        let sql = `SELECT girl_group.gid, girl_group.name, DATE_FORMAT(debut, '%Y-%m-%d') AS debut, song.title
        FROM girl_group
        JOIN song
        ON song.sid=girl_group.hit_song_id
        WHERE girl_group.gid=?;`;
        conn.query(sql, [gid], (err, rows, fields) => {
            if (err)
                throw err;
            for (let row of rows) {
                console.log(`${row.gid}\t${row.name}\t${row.debut}\t${row.hit_song}\t${row.isDeleted}`)
            }
        });
        conn.end(); 
    },

    search_girlgroup: function(sid) {       // 4. 송 검색 (sid)로
        const conn = this.getConnection();
        let sql = `SELECT song.sid, song.title, song.lyrics, girl_group.name
        FROM girl_group
        JOIN song
        ON song.sid=girl_group.hit_song_id
        WHERE girl_group.sid=?;`;
        conn.query(sql, [sid], (err, rows, fields) => {
            if (err)
                throw err;
            for (let row of rows) {
                console.log(`${row.sid}\t${row.title}\t${row.lyrics}\t${row.name}\t${row.isDeleted}`)
            }
        });
        conn.end(); 
    },

    insert_grilgroup: function(params, callback) {      // 5. 걸그룹 추가
        const conn = this.getConnection();
        const sql = `INSERT INTO girl_group (gid, name, debut, hit_song_id)
                            VALUES (?, ?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },

    update_girlgroup: function(params, callback) {    // 6. 걸그룹 수정
        const conn = this.getConnection();
        const sql = `UPDATE girl_group SET gid=?, name=?, debut=?, hit_song_id=?
                            WHERE id=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },

    delete_girlgroup: function(params, callback) {    // 7. 걸그룹 삭제
        const conn = this.getConnection();
        const sql = `UPDATE girl_group SET isDeleted=1 WHERE id=?`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },

    insert_song: function(params, callback) {      // 8. 송 추가
        const conn = this.getConnection();
        const sql = `INSERT INTO song (sid, title, lyrics)
                            VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },

    update_song: function(params, callback) {    // 9. 송 수정
        const conn = this.getConnection();
        const sql = `UPDATE song SET sid=?, title=?, lyrics=?
                            WHERE id=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },

    delete_song: function(params, callback) {    // 10. 송 삭제
        const conn = this.getConnection();
        const sql = `UPDATE song SET isDeleted=1 WHERE id=?`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
}