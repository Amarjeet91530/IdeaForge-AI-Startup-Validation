import { Router } from "express";
import {
  analyzeIdea,
  createIdea,
  getIdeas
} from "../controllers/ideaController.js";

const router = Router();

router.get("/", getIdeas);
router.post("/", createIdea);
router.post("/:id/analyze", analyzeIdea);

export default router;
