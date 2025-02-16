import { NextResponse } from "next/server";
import OpenAI from "openai";
import Tesseract from "tesseract.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const text = formData.get("text");
    const file = formData.get("file");

    let extractedText = text || "";

    // Process file if uploaded
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const { data } = await Tesseract.recognize(buffer, "eng");
      extractedText += ` ${data.text}`;
    }

    // Use OpenAI API to summarize text
    const response = await openai.completions.create({
      model: "gpt-4",
      prompt: `Summarize the following text:\n${extractedText}`,
      max_tokens: 100,
    });

    return NextResponse.json({ summary: response.choices[0].text.trim() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status:500});
  }
}