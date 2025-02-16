"use client";

import { useState } from "react";
import { Ripple } from "@/components/magicui/ripple"; // Assuming you have this component
import Sidebar from "../components/sidebar1";

export default function AISummarizer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const boilerplateCommands = [
    { command: "Summarize this text in 3 sentences.", response: "This is a brief summary of the text in 3 sentences." },
    { command: "Give me bullet points.", response: "• Point 1\n• Point 2\n• Point 3" },
    { command: "Explain like I'm 5.", response: "Imagine you're telling a 5-year-old about this. Here's how I would explain it simply!" },
  ];

  const handleSummarize = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      // Uncomment if AI functionality is working again
      /*
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || "No summary generated.");
      */

      // Simulating the AI functionality is not working and returning general summary
      setSummary("This is a placeholder summary since the AI feature isn't working.");
    } catch (error) {
      console.error("Error:", error);
      setSummary("Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the boilerplate commands click
  const handleBoilerplateClick = (response) => {
    setText(response); // Set the pre-defined response when a boilerplate command is clicked
    setSummary(response); // Optionally show the pre-defined summary immediately
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Ripple />
      <Sidebar />

      <h2 className="text-4xl font-bold text-orange-500 text-center mb-6">AI Summarizer 🤖</h2>

      <div className="mb-6">
        {/* Boilerplate commands */}
        {boilerplateCommands.map((cmd, index) => (
          <button
            key={index}
            className="mr-2 mb-2 px-4 py-2 bg-gray-800 text-orange-500 rounded-lg hover:bg-gray-700 transition-all"
            onClick={() => handleBoilerplateClick(cmd.response)}
          >
            {cmd.command}
          </button>
        ))}
      </div>

      {/* Text Input */}
      <textarea
        className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-900 text-white"
        rows="5"
        placeholder="Enter text or upload a file..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*,.pdf,.txt"
        className="mt-4 w-full bg-gray-800 text-white p-2 rounded-md"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Submit Button */}
      <button
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Summary Output */}
      {summary && (
        <div className="mt-6 p-4 border-2 border-gray-700 rounded-md bg-gray-800">
          <h3 className="text-xl font-semibold text-orange-500">Summary:</h3>
          <p className="mt-2 text-white">{summary}</p>
        </div>
      )}
    </div>
  );
}
