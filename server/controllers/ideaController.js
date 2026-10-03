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

export async function analyzeIdea(req, res) {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "Gemini analysis is not configured. Add GEMINI_API_KEY to the server .env file."
      });
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const prompt = [
      "Analyze the following startup idea as an early-stage validation assistant.",
      "Return concise JSON with these keys: problem, targetMarket, strengths, risks, validationSteps, verdict.",
      "Do not invent market statistics or claim that the idea is guaranteed to succeed.",
      "",
      `Startup name: ${idea.title}`,
      `Description: ${idea.description}`,
      `Target users: ${idea.targetUsers || "Not specified"}`,
      `Industry: ${idea.industry || "Not specified"}`
    ].join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        message: "Gemini analysis failed",
        error: data.error?.message || "Unknown Gemini API error"
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(502).json({ message: "Gemini returned an empty response" });
    }

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch {
      analysis = { summary: text };
    }

    idea.analysis = analysis;
    await idea.save();

    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Unable to analyze idea", error: error.message });
  }
}
