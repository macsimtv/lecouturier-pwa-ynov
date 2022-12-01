import Router from "@koa/router";

import * as listController from "./list.controller.js";

const router = new Router();

router.get("/", listController.index);
router.get("/:id", listController.show);
router.post("/", listController.create);
router.put("/:id", listController.update);
router.delete("/:id", listController.destroy);

export default router;