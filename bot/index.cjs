const fs = require("fs");
const path = require("path");
const login = require("@dongdev/fca-unofficial");
const { analyzeImage } = require("./services/gemini.cjs");
const { analyzeMangaQuestion } = require("./services/mangaService.cjs");
const config = require("./utils/config.cjs");

// Load commands
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".cjs"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
  console.log(`[CMD] Chargé: ${command.name}`);
}

// Read fbstate
const FB_STATE_PATH = path.join(__dirname, "account.txt");

if (!fs.existsSync(FB_STATE_PATH)) {
  console.error("❌ ERREUR: account.txt est introuvable !");
  console.error("Veuillez créer 'bot/account.txt' et y coller votre fbstate.");
  process.exit(1);
}

let appState;
try {
  const fileContent = fs.readFileSync(FB_STATE_PATH, "utf8");
  if (!fileContent.trim()) {
      throw new Error("Fichier vide");
  }
  appState = JSON.parse(fileContent);
} catch (e) {
  console.error("❌ ERREUR: Impossible de lire account.txt. Assurez-vous qu'il contient un JSON valide (fbstate).");
  console.error(e.message);
  process.exit(1);
}

// Login
login({ appState }, (err, api) => {
  if (err) {
    console.error("❌ ERREUR LOGIN:", err);
    return;
  }

  console.log("✅ Bot connecté avec succès !");

  // Options
  api.setOptions({
    listenEvents: true,
    selfListen: false,
    logLevel: "silent",
    online: true,
    autoMarkRead: true
  });

// Listen
const userCooldowns = new Map();
const COOLDOWN_TIME = 3000; // 3 secondes de cooldown entre messages

api.listenMqtt(async (err, event) => {
  if (err) return console.error(err);

  if (event.type === "message" && event.body) {
    const now = Date.now();
    const lastTime = userCooldowns.get(event.senderID) || 0;
    if (now - lastTime < COOLDOWN_TIME) return; // Anti-spam simple
    userCooldowns.set(event.senderID, now);
  }

    // Handle Images (No prefix required)
    if (event.type === "message" && event.attachments && event.attachments.length > 0) {
      if (!config.isGeminiEnabled()) return;
      const imageAttachment = event.attachments.find(att => att.type === "photo");
      if (imageAttachment) {
        console.log("🖼️ Image détectée...");
        
        // Send typing indicator
        api.sendTypingIndicator(event.threadID);

        const imageUrl = imageAttachment.url || imageAttachment.previewUrl; // FCA structure check needed, usually .url or .largePreviewUrl
        // For FCA unofficial, largePreviewUrl is often better/accessible
        const targetUrl = imageAttachment.url; 

        if (targetUrl) {
            const name = await analyzeImage(targetUrl);
            if (name) {
                console.log(`🧠 Gemini a répondu: ${name}`);
                api.sendMessage(name, event.threadID, event.messageID);
            }
        }
        return;
      }
    }

    // Handle Manga Questions (Q/ or Q[number]/)
    if (event.type === "message" && event.body && config.isMangaEnabled()) {
      const mangaRegex = /^Q\d*\/[ ]*(.*)/i;
      const match = event.body.match(mangaRegex);
      if (match) {
        const question = match[1];
        if (question) {
          console.log(`🔍 Question Manga détectée: ${question}`);
          api.sendTypingIndicator(event.threadID);
          const answer = await analyzeMangaQuestion(question);
          if (answer) {
            api.sendMessage(answer, event.threadID, event.messageID);
          }
        }
        return;
      }
    }

    // Handle Commands
    if (event.type === "message" && event.body && event.body.startsWith("!")) {
      const args = event.body.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (commands.has(commandName)) {
        try {
            console.log(`🔧 Exécution commande: ${commandName}`);
            commands.get(commandName).execute(api, event, args);
        } catch (error) {
            console.error(error);
            api.sendMessage("❌ Une erreur est survenue.", event.threadID);
        }
      }
    }
  });
});
