import { Router } from "express";
import { createSession } from "../controller/session.controller";
const router = Router();

router.post("/create",createSession)

export default router;
