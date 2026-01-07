const config = require("../utils/config.cjs");

module.exports = {
  name: "manga",
  execute: (api, event, args) => {
    const action = args[0]?.toLowerCase();
    if (action === "on") {
      config.setMangaEnabled(true);
      api.sendMessage("✅ Détection des questions manga activée.", event.threadID);
    } else if (action === "off") {
      config.setMangaEnabled(false);
      api.sendMessage("❌ Détection des questions manga désactivée.", event.threadID);
    } else {
      api.sendMessage("Utilisation : !manga on/off", event.threadID);
    }
  }
};
