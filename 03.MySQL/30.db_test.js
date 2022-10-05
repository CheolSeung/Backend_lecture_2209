const dm = require('./30.db_module');

// 1
dm.getList_girlgroup(rows => {
    for(let row of rows) {
        console.log(row.gid, row.name, row.debut, row.title);
    }
});

// 2 
dm.getList_song(rows => {
    for(let row of rows) {
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});

// 3
dm.search_girlgroup(rows => {
    for(let row of rows) {
        console.log(row.gid, row.name, row.debut, row.title);
    }
});

// 4
dm.search_girlgroup(rows => {
    for(let row of rows) {
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});

// 5 
dm.insert_grilgroup(rows => {
    for(let row of rows) {
        console.log(row.gid, row.name, row.debut, row.title);
    }
});

// 6
dm.update_girlgroup(rows => {
    for(let row of rows) {
        console.log(row.gid, row.name, row.debut, row.title);
    }
});

// 7
dm.delete_girlgroup(rows => {
    for(let row of rows) {
        console.log(row.gid, row.name, row.debut, row.title);
    }
});

// 8
dm.insert_song(rows => {
    for(let row of rows) {
        console.log(row.sid, row.title, row.lyrics);
    }
});

// 9
dm.update_song(rows => {
    for(let row of rows) {
        console.log(row.sid, row.title, row.lyrics);
    }
});

// 10
dm.delete_song(rows => {
    for(let row of rows) {
        console.log(row.sid, row.title, row.lyrics);
    }
});