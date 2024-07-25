"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const goals_1 = __importDefault(require("./routes/goals"));
const expenses_1 = __importDefault(require("./routes/expenses"));
// import categoryRouter from "./routes/category";
const bills_1 = __importDefault(require("./routes/bills"));
const transaction_1 = __importDefault(require("./routes/transaction"));
// import revenueRouter from "./routes/revenue";
const account_1 = __importDefault(require("./routes/account"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.get("/", (req, res) => {
    res.send("API IS RUNNING");
});
// middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
app.use("/api/fundflow", goals_1.default);
app.use("/api/fundflow", expenses_1.default);
// app.use("/api/category", categoryRouter);
app.use("/api/fundflow", bills_1.default);
app.use("/api/fundflow", transaction_1.default);
// app.use("/api/revenue", revenueRouter);
app.use("/api/fundflow", account_1.default);
app.listen(port, () => {
    return console.log(`Server running on port at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map