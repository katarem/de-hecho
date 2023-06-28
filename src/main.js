const moment = require("moment");
const config = require("./config.js");
const url = `https://${config.SERVER_IP}:80`;
const numtxt = document.getElementById("numtxt");
const lastdate = document.getElementById("lastdate");
const boton = document.getElementById("btn");
let num;
let date;
boton.addEventListener("click", () => click());
moment.locale("es");
read();
async function read() {
  await fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      num = data.num;
      date = data.date;
    });
  numtxt.innerHTML = num + ' "de hecho"';
  lastdate.innerHTML = "último: " + date;
}

function click() {
  num++;
  numtxt.innerHTML = num + ' "de hecho"';
  date = moment(Date.now());
  date = date.format("DD [de] MMMM [de] YYYY [a las] HH:mm");
  lastdate.innerHTML = "último: " + date;
  save();
}

async function save() {
  const datos = {
    num: num,
    date: date,
  };
  const enviar = JSON.stringify(datos);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: enviar,
  }).then((response) =>
    response.ok
      ? console.log("enviado correctamente")
      : console.log("no se envió")
  );
}
