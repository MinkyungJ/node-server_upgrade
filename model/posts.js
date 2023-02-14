import mongoose from "mongoose";
import Inc from "mongoose-sequence";
import { useVirtualId } from "../DB/db.js";
import * as User from "./auth.js";

const { Schema } = mongoose;
const AutoIncrement = Inc(mongoose);

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: Number,
      requierd: true,
    },
    title: {
      type: String,
      requierd: true,
    },
    content: {
      type: String,
      requierd: true,
    },
    userId: { type: Schema.Types.Number, ref: "userModel" },
    nickname: { type: Schema.Types.String, ref: "userModel" },
  },
  { timestamps: true }
);

postSchema.plugin(AutoIncrement, { id: "postId", inc_field: "postId" });

useVirtualId(postSchema);
const Post = mongoose.model("postModel", postSchema);

//전부 찾기
export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

//인덱스 찾기
export async function getById(postId) {
  return Post.find({ postId });
}

//생성 하기
export async function create(title, content, userId, nickname) {
  return User.findById(userId).then(() =>
    new Post({
      postId: Post.postId,
      userId,
      nickname,
      title,
      content,
    }).save()
  );
}

//수정하기
export async function update(postId, title, content) {
  return Post.updateOne(
    { postId: postId },
    { $set: { title: title, content: content } }
  );
}

//삭제하기
export async function remove(postId) {
  return Post.deleteOne({ postId: postId });
}
