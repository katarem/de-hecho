const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("test.db", sqlite3.OPEN_READWRITE, (error) => {
  if (error) return console.error(error.message);
});

let sql = "";

function insert(obj) {
  sql = "INSERT INTO webData values (?,?);";

  db.run(sql, [obj.id, obj.date], (error) => {
    if (error) return console.error(error.message);
    else console.log("insercion hecha");
  });
}

function select() {
  sql = "SELECT * FROM webData ORDER BY id DESC LIMIT 1;";

  db.all(sql, (error, rows) => {
    if (error) return console.error(error.message);
    else
      rows.forEach((row) => {
        console.log(row);
      });
  });
}

function clear() {
  sql = "DROP TABLE webData;";

  db.run(sql, (error) => {
    if (error) return console.error(error.message);
  });
}

function createdb() {
  sql = "CREATE TABLE webData(id INTEGER, date);";
  db.run(sql, (error) => {
    if (error) return console.error(error.message);
    else console.log("tabla creada");
  });
}

//insert({ id: 1, date: "31-05-2023" });
//createdb();
select();
