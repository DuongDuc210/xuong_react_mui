import express from "express";
import { conectDB } from "./config/db.js";
import AuthRouter from "./routers/auth.js";
import morgan from "morgan";
import cors from "cors";
import ProductRouter from "./routers/ProductRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import RouterTags from "./routers/tags.js";
import routerAttributes from "./routers/attribute.js";
import RouterSize from "./routers/Size.js";
import routerCart from "./routers/cart.js";
import orderRouter from "./routers/order.js";

const server = express();

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
