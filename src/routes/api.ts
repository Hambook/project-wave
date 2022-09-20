import { Router } from "express";

import auth from "./authorization/auth";

const router = Router();

router.use("/auth", auth);

export default router;