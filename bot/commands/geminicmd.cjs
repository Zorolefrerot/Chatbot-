const config = require("../utils/config.cjs");

module.exports = {
  name: "geminicmd",
  execute: (api, event, args) => {
    const action = args[0]?.toLowerCase();
    if (action === "on") {
      config.setGeminiEnabled(true);
      api.sendMessage("✅ Reconnaissance d'image Gemini activée.", event.threadID);
    } else if (action === "off") {
      config.setGeminiEnabled(false);
      api.sendMessage("❌ Reconnaissance d'image Gemini désactivée.", event.threadID);
    } else {
      api.sendMessage("Utilisation : !geminicmd on/off", event.threadID);
    }
  }
};
