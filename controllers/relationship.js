import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getRelationShips = (req,res) => {
  const q = `SELECT user_id from relationships where follow_user_id = ?`;

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(relationship => relationship.user_id));
  });
}

export const addRelationShips = (req, res) => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(500).json("Not logged In!");
  jwt.verify(token,"secretkey",(err,userInfo) => {
    if(err) return res.status(500).json("Token is not valid!");

    const q = "INSERT INTO likes (`user_id`,`post_id`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId
    ];
      db.query(q,[values],(err,data) => {
      if(err) return res.status(500).json(err);
    
      return res.status(200).json("Post has been liked");
    })
  })
}

export const deleteRelationShips = (req, res) => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(500).json("Not logged In!");
  jwt.verify(token,"secretkey",(err,userInfo) => {
    if(err) return res.status(500).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `user_id`=? AND post_id=?";
  
      db.query(q,[userInfo.id,req.query.postId],(err,data) => {
      if(err) return res.status(500).json(err);
    
      return res.status(200).json("Post has been disliked");
    })
  })
}