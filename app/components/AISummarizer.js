"use client";

import { useState } from "react";

export default function AISummarizer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const boilerplateCommands = [
    "Summarize this text in 3 sentences.",
    "Give me bullet points.",
    "Explain like I’m 5.",
  ];

  const handleSummarize = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || "No summary generated.");
    } catch (error) {
      console.error("Error:", error);
      setSummary("Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Summarizer 🤖</h2>

      {/* Boilerplate commands */}
      <div className="mb-4">
        {boilerplateCommands.map((cmd, index) => (
          <button
            key={index}
            className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setText(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <textarea
        className="w-full p-2 border rounded-md"
        rows="3"
        placeholder="Enter text or upload a file..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*,.pdf,.txt"
        className="mt-2 w-full"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Submit Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Summary Output */}
      {summary && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-bold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
  </div>
 );
}