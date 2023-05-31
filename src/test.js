const sqlite3 = require("sqlite3").verbose();
class dbmanager {
  db;
  sql;
  id;
  date;
  constructor() {
    this.db = new sqlite3.Database(
      "test.db",
      sqlite3.OPEN_READWRITE,
      (error) => {
        if (error) return console.error(error.message);
      }
    );
    this.sql = "";
  }

  insert(obj) {
    this.sql = "INSERT INTO webData values(?,?)";
    db.run(this.sql, [obj.id, obj.date], (error) => {
      if (error) {
        console.error(error.message);
        return false;
      }
    });
    return true;
  }
  //query data

  async getData() {
    this.sql = "SELECT * FROM webData ORDER BY id DESC LIMIT 1";
    this.db.all(this.sql, (error, rows) => {
      if (error) return console.error(error.message);
      rows.forEach((row) => {
        console.log(row);
        return row;
      });
    });
  }
}

async function hastaLosHuevos() {
  const dbman = new dbmanager();
  const a = await dbman.getData();
  console.log("hasta la polla " + a);
}

hastaLosHuevos();
