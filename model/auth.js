import mongoose from "mongoose";
import Inc from "mongoose-sequence";
import { useVirtualId } from "../DB/db.js";

const AutoIncrement = Inc(mongoose);

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      requierd: true,
    },
    nickname: {
      type: String,
      requierd: true,
    },
    password: {
      type: String,
      requierd: true,
    },
  },
  { timestamps: false }
);

userSchema.plugin(AutoIncrement, { id: "userId", inc_field: "userId" });

useVirtualId(userSchema);
const User = mongoose.model("userModel", userSchema);

//닉네임으로 찾기
export async function findByUsername(nickname) {
  return User.findOne({ nickname });
}

//인덱스 찾기
export async function findById(userid) {
  return User.find({ userid });
}

//생성 하기
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

//모두 찾기
export async function getAll() {
  return User.find().sort({ createdAt: -1 });
}
