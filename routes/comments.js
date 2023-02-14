import express from "express";
import * as commentController from "../controller/comments.js";
import { isAuth } from "../middleware/auth.js";
const commentRoute = express.Router();

//댓글 작성
commentRoute.post("/comments", isAuth, commentController.createComment);

//댓글 목록 조회
commentRoute.get("/comments", commentController.getComment);

//댓글 수정
commentRoute.put(
  "/comments/:commentId",
  isAuth,
  commentController.updateComment
);

// 댓글 삭제
commentRoute.delete(
  "/comments/:commentId",
  isAuth,
  commentController.deleteComment
);

export default commentRoute;
