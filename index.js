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

const server = express();
const port = process.env.PORT || 8080;

// Start the server
server.listen(port, () => console.log("Server is running with " + port));

// Define the database URL
const dbUrl =
  process.env.DB_URI ||
  "mongodb+srv://duonganhduc6a4:DzWWuIet8CD7pXFP@xuong-react-mui.kbq377m.mongodb.net/?retryWrites=true&w=majority&appName=xuong-react-mui";

// Connect to the database
conectDB(dbUrl); // Ensure that this function is correctly defined and imported

// Middleware
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

// Router configuration
server.use(`/api`, ProductRouter);
server.use(`/api/v1`, AuthRouter);
server.use(`/api/v1`, categoryRouter);
server.use(`/api/v1`, RouterTags);
server.use(`/api/v1`, routerAttributes);
server.use(`/api/v1`, RouterSize);
server.use(`/api/v1`, routerCart);
server.use("/api/v1", orderRouter);

export const viteNodeApp = server;
