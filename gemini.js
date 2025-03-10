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
    'Translate input text to Vietnamese and English. Result in json string with keys "vietnamese" and "english"',
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

async function run() {
  const startTime = Date.now();
  const result = await chatSession.sendMessage(
    "3月10日讯，一汽解放公告，2025年2月份销量为2.56万辆，本年累计销量为4.8万辆，去年累计销量为4.38万辆。其中，重型货车2月销量为1.86万辆；中型货车2月销量为2680辆；轻型货车2月销量为4340辆。"
  );
  const raw = result.response.text();
  const data = raw.replaceAll("```json", "").replaceAll("```", "");
  const json = JSON.parse(data);
  const endTime = Date.now();
  console.log(`Time: ${endTime - startTime}ms`);
  console.log(json);
}

run();
