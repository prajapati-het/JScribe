import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import {UserAuthRouter} from "./routes/UserAuthRouter";
import cookieParser from "cookie-parser";
import { User } from "./models/User";
import { admin } from "./firebase";
import Stripe from 'stripe';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin:"http://localhost:5173"}));
config();

const stripe = new Stripe(process.env.SECRET_KEY!,{
});


app.use("/compiler", compilerRouter);
app.use("/user", UserAuthRouter);

app.post("/api/protected", verifyTokengoogle, async (req, res) => {
  try {
      console.log("Decoded Token:", req.body); // Contains decoded token

      const { name: username, email, picture } = req.body; // Destructure the relevant fields from the token

      if (!username) {
          return res.status(400).json({ message: "Username is required." });
      }

      let user = await User.findOne({ email });

      console.log(user)

      if (!user) {
          user = new User({
              username,
              email,
              picture,
          });

          await user.save();
      }

      res.status(200).json(user);
  } catch (error) {
      console.error("Error during user validation:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});



async function verifyTokengoogle(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const idToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!idToken) {
      return res.status(401).send("Unauthorized");
  }

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.body = decodedToken;
      next();
  } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).send("Unauthorized");
  }
}


  app.post("/api/create-donate-session", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Donation",
                        },
                        unit_amount: amount*100,
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/success?status=success",
            cancel_url: "http://localhost:5173/cancel?status=canceled",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to create session" });
    }
});


dbConnect();
app.listen(4000, () => {
    console.log("http://localhost:4000");
});