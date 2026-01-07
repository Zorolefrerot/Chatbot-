const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  execute: (api, event) => {
    const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith('.cjs'));
    let msg = "🤖 Commandes Disponibles :\n\n";
    
    commandFiles.forEach(file => {
      const cmdName = file.replace('.cjs', '');
      msg += `!${cmdName}\n`;
    });
    
    msg += "\n📸 Envoyez une image pour obtenir le nom du personnage/personne !";
    
    api.sendMessage(msg, event.threadID, event.messageID);
  }
};
