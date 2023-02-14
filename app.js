import dotenv from "dotenv";
import db from "./DB/db.js";
import express from "express";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import userRoute from "./routes/auth.js";

dotenv.config();

const app = express();

//나머지 불러오기
app.use(express.json());

//서버,db연결
db();

//연결
app.use("/posts", postRoute);
app.use("/posts/:postId", commentRoute);
app.use("/", userRoute);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
