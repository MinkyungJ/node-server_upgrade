import jwt from "jsonwebtoken";
import * as User from "../model/auth.js";
import dotenv from "dotenv";
dotenv.config();

//비밀키 env
const secretKey = process.env.SECRETKEY;

// 사용자 인증 미들웨어
export const isAuth = async (req, res, next) => {
  const token = req.headers.cookie;
  const authToken = token.split("20")[1];

  //쿠키가 존재하지않을때 대비
  if (!authToken) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    //토큰 만료를 확인, 토큰이 서버발급토큰이 맞는지 검증
    const check = jwt.verify(authToken, secretKey);
    if (!check) {
      return res
        .status(403)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }

    //토큰의 아이디가 실제 db에 있는지 확인
    const decodedToken = jwt.decode(authToken);
    const test = await User.findById(decodedToken.userId);
    if (test == null) {
      return res
        .status(403)
        .json({ errorMessage: "계정이 존재하지 않습니다." });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
