# GenX.AI 🤖

GenX.AI is an AI-powered chat application built using Java, Spring Boot, and Spring AI, integrated with Google's Gemini model.

## 🚀 Features

- AI-powered conversations using Gemini
- Conversation memory using Spring AI
- REST API built with Spring Boot
- Request validation
- Centralized exception handling
- Health-check endpoint

## 🛠️ Tech Stack

- Java 21
- Spring Boot
- Spring AI
- Google Gemini API
- Maven
- REST API

## ⚙️ Setup

### Prerequisites

- JDK 21
- IntelliJ IDEA or another Java IDE
- Google Gemini API key

### Configure API Key

Set the `GOOGLE_API_KEY` environment variable to your Gemini API key.

Never commit your API key to GitHub.

### Run the Backend

Open a terminal in the `backend` directory and run:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell, use:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at `http://localhost:8082`.

## 🔌 API Endpoints

### Health Check

`GET /api/health`

### Chat

`POST /api/chat`

Example request:

```json
{
  "message": "Explain Spring AI briefly.",
  "conversationId": "krishna-chat-1"
}
```

## 📌 Project Status

Backend implementation is in progress. Frontend and advanced AI features are planned.
