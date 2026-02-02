import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//Config and Connect DB
dotenv.config();
connectDB();

const app = express();

//Use Predefined Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ProductRoutes
app.use("/api/products", productRoutes);

//User Routes
app.use("/api/users", userRoutes);

//Order Routes
app.use("/api/orders", orderRoutes);

//Upload Routes
app.use("/api/upload", uploadRoutes);

//Config Route
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.send("Api Is Running");
});

// //Make upload folder static
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
//   //Default Route
//   app.get("/", (req, res) => {
//     res.send("Api Is Running");
//   });
// }

//Use CustomMiddleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);

export default app;
