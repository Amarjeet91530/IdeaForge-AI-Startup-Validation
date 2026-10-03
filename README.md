# IdeaForge - AI Startup Validation Platform

IdeaForge is a full-stack web application for capturing startup ideas and preparing them for structured, AI-assisted validation.

## Features

- Add startup ideas with title, description, target users, and industry
- Save ideas through a REST API
- Store idea data in MongoDB
- Prepare the backend for Gemini-powered analysis
- Responsive React interface
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

## Run Locally

### Backend

```bash
cd server
npm install
```

Create `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
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

## API

- `POST /api/ideas` - create an idea
- `GET /api/ideas` - list saved ideas

## Environment Variables

Keep database credentials and API keys in `.env`. Do not commit them to GitHub.
