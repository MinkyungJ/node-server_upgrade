import express from "express";
import * as postController from "../controller/posts.js";
const postRoute = express.Router();

//게시글 작성
postRoute.post("/", postController.createPost);

//게시글 조회
postRoute.get("/", postController.getPost);

//게시글 상세 조회
postRoute.get("/:postId", postController.getDetailPost);

//게시글 수정
postRoute.put("/:postId", postController.updatePost);

// // 게시글 삭제
postRoute.delete("/:postId", postController.deletePost);

export default postRoute;
