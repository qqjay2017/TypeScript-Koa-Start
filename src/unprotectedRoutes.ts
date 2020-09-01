import Router from "@koa/router";
import { getCat } from "./controllers/cat";

const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get("/cat", getCat);

export { unprotectedRouter };