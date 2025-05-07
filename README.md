# 🤖 Q&A System

An intelligent Question & Answer platform leveraging modern web technologies and AI.

## 📋 Overview

Q&A System is a production-ready application that connects users with AI-powered answers through an intuitive interface. Built with a modern tech stack, it demonstrates seamless integration between a responsive frontend and efficient backend with external AI services.

## ✨ Key Features

- **Natural Language Processing**: Submit questions in everyday language and receive intelligent responses
- **Real-time Interaction**: Get instant answers with minimal latency
- **Conversation History**: Review past interactions with an organized, collapsible history panel
- **Persistent Storage**: Conversations are saved locally for privacy and convenience
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## 🔧 Technology Stack

### Frontend
- **Next.js 14** with App Router for optimized routing and server components
- **React** for interactive UI components
- **Tailwind CSS** for utility-first responsive styling

### Backend
- **FastAPI** for high-performance API endpoints
- **Uvicorn** ASGI server
- **OpenRouter.ai** API integration for accessing advanced language models
- **Python-dotenv** for environment variable management


## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- Python 3.9 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamdarzee/Q-A-System.git
   cd Q-A-System
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   
   Create an OpenRouter account and get the API key https://openrouter.ai/, then copy the key into the .env file:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Start the backend server**
   ```bash
   cd backend
   python -m venv venv
   python -m uvicorn app.main:app --reload
   ```

5. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application**
   
   Access the application from the frontend

## 💻 Usage Guide

1. **Ask a question**
   - Type your question in the text area
   - Click "Answer"

2. **View responses**
   - AI-generated answers appear in a formatted response panel
   

3. **Manage conversation history**
   - Scroll through past Q&A pairs
   - Expand/collapse individual conversations
   - Clear history with delete icon if needed

## 🔑 API Configuration

### OpenRouter API Setup
1. Create an account at [OpenRouter.ai](https://openrouter.ai)
2. Navigate to **Settings > API Keys**
3. Generate a new API key
4. Add the key to your backend `.env` file


### Backend API Endpoints
- `POST /api/ask`: Submit questions and receive AI responses
- `GET /api/health`: Check API health status

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [OpenRouter.ai](https://openrouter.ai) for providing the AI backend
- [FastAPI](https://fastapi.tiangolo.com/) for the efficient Python backend framework
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
