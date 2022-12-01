import Router from "@koa/router";
import * as todoController from "./todo.controller.js";

const router = new Router();

router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.get('/:id', todoController.index);

export default router;