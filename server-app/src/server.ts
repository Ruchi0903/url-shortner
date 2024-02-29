import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
import path from "path";
dotenv.config();
connectDb();

const port = process.env.PORT || 5001;

const app = express();

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client-app/url-shortner-app", "build")));
  app.use( express.static(path.resolve(__dirname, "client-app/url-shortner-app", "build", "index.html")));
});

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/", shortUrl);


app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});
