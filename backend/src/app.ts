import dotenv from "dotenv";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import goalRouter from "./routes/goals";
import expensesRouter from "./routes/expenses";
import categoryRouter from "./routes/category";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

// middleware
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/goal", goalRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/category", categoryRouter);
app.listen(port, () => {
  return console.log(`Server running on port at http://localhost:${port}`);
});
