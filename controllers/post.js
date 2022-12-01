import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import moment from "moment";

export const getPosts = (req,res) => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(500).json("Not logged In!");
  jwt.verify(token,"secretkey",(err,userInfo) => {
    if(err) return res.status(500).json("Token is not valid!");

    const q = "SELECT p.*,u.id AS userId,name,profilePic FROM post AS p JOIN users AS u ON (u.id = p.userid) JOIN relationships AS r ON  (p.userId=r.follow_user_id or p.userId = r.user_id	) WHERE r.user_id = ? OR p.userId=? ORDER BY p.createdAt DESC";
      db.query(q,[userInfo.id,userInfo.id],(err,data) => {
      if(err) return res.status(500).json(err);
    
      return res.status(200).json(data);
    })
  })
}

export const addPost = (req,res) => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(500).json("Not logged In!");
  jwt.verify(token,"secretkey",(err,userInfo) => {
    if(err) return res.status(500).json("Token is not valid!");

    const q = "INSERT INTO post(`desc`,`img`,`createdAt`,`userid`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
      db.query(q,[values],(err,data) => {
      if(err) return res.status(500).json(err);
    
      return res.status(200).json("Post has been created added successfully");
    })
  })
}