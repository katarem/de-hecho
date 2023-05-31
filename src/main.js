const moment = require("moment/moment");
const { resolve } = require("path");
const firedb = require("./firebase");
const numtxt = document.getElementById("numtxt");
const lastdate = document.getElementById("lastdate");
const boton = document.getElementById("btn");
let num;
let date;
boton.addEventListener("click", () => click());
const db = new firedb();

moment.locale("es");
read();
async function read() {
  const list = await db.readData();
  const obj = list[list.length - 1];
  num = obj.id;
  date = obj.date;
  numtxt.innerHTML = obj.id + ' "de hecho"';
  lastdate.innerHTML = "último: " + obj.date;
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
  const inserted = db.writeData(num, date);
  if (inserted) console.log("insertado!");
  else console.log("no se insertó");
}
