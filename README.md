# HtlmExtractorBot

## Version

`La version actuelle est: v1.0.0`

HtlmExtractorBot est un bot Discord conçu pour récupérer le code HTML, CSS et JavaScript d'un site internet sur demande.

## Installation

1. Clonez ce dépôt sur votre machine locale : https://github.com/Az-png/HtlmExtractorBot.git
2. Accédez au répertoire du bot : `cd HtlmExtractorBot`
3. Installez les dépendances nécessaires à l'aide de npm : npm install discord.js@12.5.0 request cheerio
4. Ouvrez le fichier `config.json` et configurez le jeton Discord (Discord token) :
 ```json
{
  "token": "YOUR_DISCORD_TOKEN"
}
```
5. node index.js
6. Le bot est maintenant en ligne et prêt à être utilisé sur votre serveur Discord !

## Utilisation
* Mentionnez le bot dans un canal de discussion et utilisez la commande !recup suivie de l'URL du site web que vous souhaitez récupérer. Par exemple : `!recup https://example.com`.
  * Le bot répondra avec le code source HTML, CSS et JavaScript de la page demandée.

## Configuration supplémentaire
* Vous pouvez personnaliser le préfixe de commande en modifiant la valeur `prefix` dans le fichier `config.json`.

## Contribuer

* Les contributions sont les bienvenues ! Si vous souhaitez améliorer ou ajouter des fonctionnalités à HtlmExtractorBot, veuillez soumettre une demande d'extraction (pull request).

## Licence
* Ce projet ne contient aucune licence. Vous pouvez le réutiliser à votre guise, veuillez juste me citer dans les crédits
