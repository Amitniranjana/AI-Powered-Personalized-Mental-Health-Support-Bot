const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  // enter your gemini key 

  console.log(apiKey);
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function generateContent(prompt) {

    const parts = [
        {text: "behave as a mental health chatbot. answer me in hindi"},
        {text: "input: hi"},
        {text: "badiya"},
        {text: `input: ${prompt}`},
        {text: "output: "},
      ];
    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

    return result.response.text()
  }

  module.exports = generateContent
