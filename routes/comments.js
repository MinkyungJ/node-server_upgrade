import express from "express";
import * as commentController from "../controller/comments.js";
const commentRoute = express.Router();

//댓글 작성
commentRoute.post("/comments", commentController.createComment);

//댓글 목록 조회
commentRoute.get("/comments", commentController.getComment);

//댓글 수정
commentRoute.put("/comments/:commentId", commentController.updateComment);

// 댓글 삭제
commentRoute.delete("/comments/:commentId", commentController.deleteComment);

export default commentRoute;
