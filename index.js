import express from "express";
import AuthRouter from "./src/routers/auth.js";
import morgan from "morgan";
import cors from "cors";
import ProductRouter from "./src/routers/ProductRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import RouterTags from "./src/routers/tags.js";
import routerAttributes from "./src/routers/attribute.js";
import RouterSize from "./src/routers/Size.js";
import routerCart from "./src/routers/cart.js";
import orderRouter from "./src/routers/order.js";
import { conectDB } from "./src/config/db.js"; // Ensure this function is exported correctly

const app = express();
const port = process.env.PORT || 8080;

// Start the app
app.listen(port, () => console.log("app is running with " + port));

// Define the database URL
const dbUrl =
  process.env.DB_URI ||
  "mongodb+srv://duonganhduc6a4:DzWWuIet8CD7pXFP@xuong-react-mui.kbq377m.mongodb.net/?retryWrites=true&w=majority&appName=xuong-react-mui";

// Connect to the database
conectDB(dbUrl); // Ensure that this function is correctly defined and imported

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Router configuration
app.use(`/api`, ProductRouter);
app.use(`/api/v1`, AuthRouter);
app.use(`/api/v1`, categoryRouter);
app.use(`/api/v1`, RouterTags);
app.use(`/api/v1`, routerAttributes);
app.use(`/api/v1`, RouterSize);
app.use(`/api/v1`, routerCart);
app.use("/api/v1", orderRouter);

export const viteNodeApp = app;
