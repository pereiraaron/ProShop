import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  const morgan = (await import("morgan")).default;
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

//Swagger Docs (lazy loaded)
app.get("/api/docs/spec.json", async (_req, res) => {
  const swaggerSpec = (await import("./config/swagger.js")).default;
  res.json(swaggerSpec);
});
app.get("/api/docs", (_req, res) => {
  res.send(`<!DOCTYPE html>
<html><head>
<title>ProShop API</title>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head><body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>SwaggerUIBundle({url:"/api/docs/spec.json",dom_id:"#swagger-ui"})</script>
</body></html>`);
});

//Config Route
app.get("/api/config/paypal", (_req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "ProShop API is running",
  });
});

//Use CustomMiddleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
}

export default app;
