"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  question: string;
  answer: string;
  expanded?: boolean;
  upvotes?: number;
  downvotes?: number;
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem("qa_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("qa_history", JSON.stringify(history));
  }, [history]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const receivedAnswer = data.answer || "No response received.";
      setAnswer(receivedAnswer);

      const newEntry: HistoryItem = { question, answer: receivedAnswer, expanded: false };
      setHistory([newEntry, ...history]);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const toggleExpand = (index: number) => {
    setHistory((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const deleteHistoryItem = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-start p-6 sm:p-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Q&A System</h1>

        <textarea
          className="w-full h-32 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Get Answer"}
        </button>

        {answer && (
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Answer</h2>
            <p className="text-gray-800 whitespace-pre-line animate-fade-in">{answer}</p>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="w-full max-w-3xl mt-8 bg-white rounded-2xl shadow-lg p-6 space-y-4 max-h-[400px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">History</h2>
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-start">
                <div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-left font-semibold text-gray-800 hover:underline"
                  >
                    Q: {item.question}
                  </button>
                  {item.expanded && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">A: {item.answer}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteHistoryItem(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
