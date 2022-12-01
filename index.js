import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import relationRoutes from "./routes/relationships.js"
import cors from "cors";
import multer from "multer"
import cookieParser from "cookie-parser";

const app = express()

//middlewares
app.use((req,res,next )=> {
  res.header("Access-Control-Allow-Credentials",true)
  next();
})
app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000"
}))
app.use(cookieParser())

//multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/youtube2022/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload',upload.single("file"),(req,res) => {
  const file = req.file;
  res.status(200).json(file.filename);
})
//multer

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/relationships",relationRoutes )
app.use("/api/info",(req,res) => {
  res.status(200).json({
    author:"mahaveer",
    database:"mysql",
    deubg:"false"
  })
} )

app.listen(8800, () => {
  console.log("API WORKING")
})