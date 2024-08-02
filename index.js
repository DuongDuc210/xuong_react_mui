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
import { conectDB } from "./src/config/db.js";

const server = express();
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server is running with " + port));

//  middleware
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
/// connect DB
conectDB(process.env.DB_URL);
//Router
server.use(`/api`, ProductRouter);
server.use(`/api/v1`, AuthRouter);
server.use(`/api/v1`, categoryRouter);
server.use(`/api/v1`, RouterTags);
server.use(`/api/v1`, routerAttributes);
server.use(`/api/v1`, RouterSize);
server.use(`/api/v1`, routerCart);
server.use("/api/v1", orderRouter);

export const viteNodeApp = server;
