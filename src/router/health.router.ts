import { Router } from "express";
import { healthz } from "../controller/health.controller";
const router = Router();

router.get("/",healthz)

export default router;
