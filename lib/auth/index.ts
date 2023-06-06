import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function signToken(user: Omit<User, "password">): string {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "30d" });
}

function verifyToken(token: string): string | jwt.JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch(err) {
    console.log('err', err);
    return null;
  }
}

// function isAuth(req, res, next){
//     const { authorization } = req.headers;
//     if (authorization) {
//       try {
//         // Bearer xxx => xxx
//         const token = authorization.slice(7, authorization.length);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//         const user = await User.findOne({
//           _id: decoded._id,
//           "tokens.token": token,
//         });
  
//         if (!user) {
//           throw new Error();
//         }
//         req.user = user;
//         next();
//       } catch (error) {
//         res.status(401).send("Please authenticate.");
//       }
//     } else {
//       res.status(401).send("Token is not suppiled");
//     }
//   };

function generatePassword(plainTextPassword: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(plainTextPassword, saltRounds);
}

function comparePasswords(plainTextPassword: string, hash: string): boolean {
  return bcrypt.compareSync(plainTextPassword, hash);
}

export { signToken, verifyToken, generatePassword, comparePasswords };
