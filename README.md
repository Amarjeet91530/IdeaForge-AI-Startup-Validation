# IdeaForge - AI Startup Validation Platform

IdeaForge is a full-stack web application for capturing startup ideas, storing them in MongoDB, and sending them to Gemini for structured early-stage validation.

## Features

- Add startup ideas with title, description, target users, and industry
- Save ideas through a REST API
- Store ideas in MongoDB
- Run Gemini-powered validation analysis for a saved idea
- Display the AI analysis in the React interface
- Basic backend validation and error handling
- Separate client and server structure

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- REST APIs
- Google Gemini API

## Project Structure

```
IdeaForge-AI-Startup-Validation/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── controllers/
│   │   └── ideaController.js
│   ├── models/
│   │   └── Idea.js
│   ├── routes/
│   │   └── ideaRoutes.js
│   ├── app.js
│   └── package.json
└── README.md
```

## How It Works

1. The user enters a startup idea in the React interface.
2. React sends the form data to the Express REST API.
3. Express validates the request and stores the idea in MongoDB.
4. The saved idea can be sent to Gemini through a backend API endpoint.
5. Gemini returns a structured validation response.
6. The result is stored with the idea and displayed in the frontend.

## Run Locally

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Start the API:

```bash
npm run dev
```

### Frontend

In another terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## API

- `POST /api/ideas` - create an idea
- `GET /api/ideas` - list saved ideas
- `POST /api/ideas/:id/analyze` - analyze a saved idea with Gemini

The Gemini analysis endpoint requires `GEMINI_API_KEY`. The API key stays on the server and must not be placed in React code.

## Environment Variables

Keep database credentials and API keys in `.env`. Do not commit them to GitHub.

## Notes

The validation result is intended as an early-stage assistant output. It should be treated as a starting point for research and customer validation rather than proof that a startup will succeed.
