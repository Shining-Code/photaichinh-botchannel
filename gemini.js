const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  systemInstruction:
    "Translate input text to Vietnamese and English and summorize them in a short title. Result in json string with keys: vi, en, vi_summary, en_summary.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const chatSession = model.startChat({
  generationConfig,
  history: [],
});

async function translate(content) {
  const result = await chatSession.sendMessage(content);
  const raw = result.response.text();
  const data = raw.replaceAll("```json", "").replaceAll("```", "");
  console.log(data);
  const json = JSON.parse(data);
  return json;
}

module.exports = {
  translate,
};
