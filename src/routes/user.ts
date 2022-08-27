import { Router } from "express";
import { UserController } from "../controller/UserController";
import {checkJwt} from "../middlewares/checkjwt";
import {checkRole} from "../middlewares/checkrole";

const router = Router();
router.get("/", [checkJwt, checkRole["ADMIN"]], UserController.listAll);

router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole["ADMIN"]],
    UserController.getOneByID
);

router.post("/", [checkJwt, checkRole["ADMIN"]], UserController.newUser);

router.put(
    "/:id([0-9]+)",
    [checkJwt, checkRole["ADMIN"]],
    UserController.editUser
);

router.delete(
    "/id:([0-9]+)",
    [checkJwt, checkRole["ADMIN"]],
    UserController.deleteUser
)

export default router;