// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import Tesseract from "tesseract.js";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req) {
//   const formData = await req.formData();
//   const image = formData.get("image");

//   const {
//     data: { text },
//   } = await Tesseract.recognize(await image.arrayBuffer(), "eng");
//   const response = await openai.completions.create({
//     model: "gpt-4",
//     prompt: `Summarize this text: ${text}`,
//     max_tokens: 100,
//   });

//   return NextResponse.json({
//     extractedText: text,
//     summary: response.choices[0].text.trim(),
//   });
// }
