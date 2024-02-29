"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, dbConfig_1.default)();
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "client-app/url-shortner-app", "build")));
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "client-app/url-shortner-app", "build", "index.html")));
});
// MIDDLEWARE
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/", shortUrl_1.default);
app.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
});
