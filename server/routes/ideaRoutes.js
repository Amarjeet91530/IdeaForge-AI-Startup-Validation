import { Router } from "express";
import { createIdea, getIdeas } from "../controllers/ideaController.js";

const router = Router();

router.post("/", createIdea);
router.get("/", getIdeas);

export default router;
