import Idea from "../models/Idea.js";

export async function createIdea(req, res) {
  try {
    const { title, description, targetUsers, industry } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const idea = await Idea.create({ title, description, targetUsers, industry });
    res.status(201).json(idea);
  } catch (error) {
    res.status(500).json({ message: "Unable to create idea", error: error.message });
  }
}

export async function getIdeas(req, res) {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch ideas", error: error.message });
  }
}
