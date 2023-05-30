const fs = require("fs");
const moment = require("moment/moment");
const numtxt = document.getElementById("numtxt");
const lastdate = document.getElementById("lastdate");
const boton = document.getElementById("btn");
let num;
let date;
boton.addEventListener("click", () => click());
moment.locale("es");
read();
function read() {
  const rawdata = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawdata);
  num = data.clicks;
  date = moment(data.date);

  date = date.format("DD [de] MMMM [de] YYYY");
  console.log(date);
  numtxt.innerHTML = num + ' "de hecho"';
  lastdate.innerHTML = "último: " + date;
}

function save() {
  const data = {
    num: num,
    date: date,
  };
  const out = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", out);
}

function click() {
  num++;
  numtxt.innerHTML = num + ' "de hecho"';
  save();
}
