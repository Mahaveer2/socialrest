import mysql from "mysql";

export const db = mysql.createConnection({
  host:'containers-us-west-101.railway.app',
  user:'root',
  password:"mehiyVnoODYCG4gAkxkv",
  database:"railway"
});