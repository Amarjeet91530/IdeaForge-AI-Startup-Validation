import { useState } from "react";

const apiUrl = "http://localhost:5000/api/ideas";

const emptyForm = {
  title: "",
  description: "",
  targetUsers: "",
  industry: ""
};

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [savedIdea, setSavedIdea] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save idea");
      }

      setSavedIdea(data);
      setForm(emptyForm);
      setMessage("Idea saved successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function analyzeIdea() {
    if (!savedIdea) {
      return;
    }

    setAnalyzing(true);
    setMessage("");

    try {
      const response = await fetch(`${apiUrl}/${savedIdea._id}/analyze`, {
        method: "POST"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to analyze idea");
      }

      setSavedIdea(data);
      setMessage("AI analysis completed.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">IdeaForge</p>
        <h1>Turn a startup idea into a structured validation request.</h1>
        <p className="intro">
          Capture the problem, target users, and industry before moving to deeper validation.
        </p>
      </section>

      <section className="card">
        <form onSubmit={handleSubmit}>
          <label>
            Startup name
            <input name="title" value={form.title} onChange={handleChange} placeholder="Example: CampusCart" required />
          </label>

          <label>
            Idea description
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="What problem does the product solve?" rows="5" required />
          </label>

          <div className="grid">
            <label>
              Target users
              <input name="targetUsers" value={form.targetUsers} onChange={handleChange} placeholder="College students" />
            </label>

            <label>
              Industry
              <input name="industry" value={form.industry} onChange={handleChange} placeholder="EdTech" />
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save idea"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </section>

      {savedIdea && (
        <section className="result card">
          <p className="eyebrow">Saved idea</p>
          <h2>{savedIdea.title}</h2>
          <p>{savedIdea.description}</p>

          <div className="details">
            <span>{savedIdea.targetUsers || "Target users not added"}</span>
            <span>{savedIdea.industry || "Industry not added"}</span>
          </div>

          <button className="analyze" onClick={analyzeIdea} disabled={analyzing}>
            {analyzing ? "Analyzing..." : "Analyze with Gemini"}
          </button>

          {savedIdea.analysis && (
            <div className="analysis">
              <h3>Validation analysis</h3>
              <p><strong>Problem:</strong> {savedIdea.analysis.problem}</p>
              <p><strong>Target market:</strong> {savedIdea.analysis.targetMarket}</p>
              <p><strong>Strengths:</strong> {savedIdea.analysis.strengths}</p>
              <p><strong>Risks:</strong> {savedIdea.analysis.risks}</p>
              <p><strong>Validation steps:</strong> {savedIdea.analysis.validationSteps}</p>
              <p><strong>Verdict:</strong> {savedIdea.analysis.verdict}</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}