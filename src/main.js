const moment = require("moment/moment");
const { resolve } = require("path");
const sqlite3 = require("sqlite3").verbose();
const numtxt = document.getElementById("numtxt");
const lastdate = document.getElementById("lastdate");
const boton = document.getElementById("btn");
let num;
let date;
boton.addEventListener("click", () => click());

let db = new sqlite3.Database("test.db", sqlite3.OPEN_READWRITE, (error) => {
  if (error) return console.error(error.message);
});
let sql = "";

moment.locale("es");
read();
async function read() {
  const obj = await getData();
  numtxt = obj.id + " de hecho";
  datetxt = "último: " + obj.date;
}

function click() {
  num++;
  numtxt.innerHTML = num + ' "de hecho"';
  date = moment(Date.now());
  date = date.format("DD [de] MMMM [de] YYYY [a las] HH:mm");
  lastdate.innerHTML = "último: " + date;
  save();
}

function save() {
  const obj = {
    id: num,
    date: date,
  };
  const inserted = insert(obj);
  if (inserted) console.log("insertado!");
  else console.log("no se insertó");
}

function insert(obj) {
  sql = "INSERT INTO webData values(?,?)";
  db.run(sql, [obj.id, obj.date], (error) => {
    if (error) {
      console.error(error.message);
      return false;
    }
  });
  return true;
}
//query data

async function getData() {
  sql = "SELECT * FROM webData ORDER BY id DESC LIMIT 1";
  let obj;
  obj = await new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) reject("error");
      else resolve(rows[0]);
    });
  });
  return obj;
}
