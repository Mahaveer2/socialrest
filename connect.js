import mysql from "mysql2";


let MYSQLDATABASE = "railway";
let MYSQLUSER = "root";
let MYSQLHOST = "containers-us-west-101.railway.app";
let MYSQLPORT = "6859";
let MYSQLPASSWORD = "mehiyVnoODYCG4gAkxkv";

export const db = mysql.createConnection({
  host:'containers-us-west-101.railway.app',
  user:'root',
  password:"mehiyVnoODYCG4gAkxkv",
  database:"railway",
  port:"6859",
  connectionLimit : 100,
});