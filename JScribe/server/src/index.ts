import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import {UserAuthRouter} from "./routes/UserAuthRouter";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/verifyToken";
import { User } from "./models/User";
import { admin } from "./firebase";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin:"http://localhost:5173"}));
config();

app.use("/compiler", compilerRouter);
app.use("/user", UserAuthRouter);

app.post("/api/protected", verifyTokengoogle, async (req, res) => {
  try {
    console.log("Request body:", req.body);

    //const { username, email, password, picture } = req.body;
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.name;
    const picture = req.body.picture;
    console.log("Extracted values - Username:", username, "Email:", email, "Password:", password, "Picture:", picture);

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Find an existing user by email
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = new User({
        username,
        email,
        password,
        picture,
      });

      // Save the new user to the database
      await user.save();
    }

    // Send the user data as a response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during user validation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  async function verifyTokengoogle(req : Request, res: Response, next:NextFunction) {
    const idToken = req.headers.authorization;
  
    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.body = decodedToken;
      next();
    } catch (error) {
        console.log(error)
      return res.status(401).send("Unauthorized");
    }
  }

dbConnect();
app.listen(4000, () => {
    console.log("http://localhost:4000");
});