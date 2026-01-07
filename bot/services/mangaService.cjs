const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Initialize Gemini with rotation
const apiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
  process.env.GEMINI_API_KEY_6
].filter(key => !!key);

let currentKeyIndex = 0;

function getModel() {
  const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

async function analyzeMangaQuestion(question) {
  let attempts = 0;
  while (attempts < apiKeys.length) {
    try {
      const model = getModel();
      const prompt = `L'utilisateur demande : "${question}".
Est-ce que cette question porte sur l'univers des mangas ou des animés ? 
Si OUI, donne uniquement la réponse à la question, de manière ultra-concise. Pas de "Oui", pas d'introduction, pas de phrases d'explications. Juste la réponse brute.
Si NON, réponds uniquement par le mot "NON".`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const trimmed = responseText.trim();
      if (trimmed === "NON" || trimmed.toLowerCase() === "non") {
          return null;
      }
      return trimmed;
    } catch (error) {
      if (error.message && error.message.includes("429")) {
        console.warn(`⚠️ Clé ${currentKeyIndex + 1} épuisée (Quota Manga). Passage à la suivante...`);
      } else {
        console.error(`Erreur Gemini Manga (Clé ${currentKeyIndex + 1}):`, error.message);
      }
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      attempts++;
    }
  }
  return null;
}

module.exports = { analyzeMangaQuestion };
