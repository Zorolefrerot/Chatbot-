# Bot Facebook Messenger - Guide d'Installation

## 1. Authentification Facebook (fbstate)

Le bot utilise un cookie de session (fbstate) pour se connecter sans mot de passe.

1.  Installez l'extension **c3c-fbstate** sur votre navigateur (Chrome/Edge/Firefox).
2.  Allez sur [Facebook](https://www.facebook.com) et connectez-vous au compte du bot.
3.  Cliquez sur l'extension c3c-fbstate > **Copy State**.
4.  Ouvrez le fichier `bot/account.txt` dans ce projet.
5.  Collez **tout** le contenu JSON copié dedans.
6.  Sauvegardez.

> ⚠️ **Attention** : Ne partagez jamais ce fichier. Si vous vous déconnectez de Facebook sur le navigateur, vous devrez refaire cette manipulation.

## 2. Clé API Gemini (Google)

Le bot utilise l'IA de Google pour reconnaître les images.

1.  Allez sur [Google AI Studio](https://aistudio.google.com/app/apikey) et créez une clé API.
2.  Sur Replit, allez dans l'onglet **Secrets** (le cadenas 🔒).
3.  Ajoutez une nouvelle variable :
    *   Clé : `GEMINI_API_KEY`
    *   Valeur : `Votre_Clé_API_Google_Ici`

## 3. Lancer le Bot

Dans le terminal (Shell), tapez :

```bash
node bot/index.js
```

Si tout fonctionne, vous verrez : `✅ Bot connecté avec succès !`

## 4. Utilisation

*   **Commandes** : Tapez `!help` ou `!ping` dans le chat.
*   **Images** : Envoyez une image (n'importe où, groupe ou privé). Le bot répondra automatiquement avec le nom du personnage/personne.

## 5. Ajouter une commande

Créez un fichier dans `bot/commands/`, par exemple `bonjour.js` :

```javascript
module.exports = {
  name: "bonjour",
  execute: (api, event) => {
    api.sendMessage("Salut !", event.threadID);
  }
};
```
