const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const config = require('./config')

const client = new Discord.Client();
let prefix = config.prefix;

client.on('ready', () => {
  console.log(`Connecté à ${client.user.tag} \n mon prefix est: ${config.prefix}`);
});

client.on('message', message => {
  if (message.author.bot) {
    return;
  }


  // Vérification si le bot est mentionné
  if (message.mentions.users.has(client.user.id)) {
    message.reply(`Mon préfixe actuel est : ${prefix}`);
    return;
  }

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'recup') {
    const siteURL = args[0];

    if (!siteURL) {
      message.reply('Veuillez spécifier une URL valide.');
      return;
    }

    request(siteURL, (error, response, body) => {
      if (error) {
        message.reply('Une erreur s\'est produite lors de la récupération du site.');
        console.error(error);
        return;
      }

      if (response.statusCode !== 200) {
        message.reply('La page demandée n\'a pas pu être récupérée.');
        return;
      }

      if (body.includes('<?php')) {
        message.reply('Le site est créé en PHP. Impossible de récupérer le code.');
        return;
      }

      const $ = cheerio.load(body);

      // Récupération du code JavaScript
      const scriptTags = $('script');
      const jsCode = [];
      scriptTags.each((index, element) => {
        const code = $(element).html();
        if (code) {
          jsCode.push(code);
        }
      });

      // Récupération du code CSS
      const styleTags = $('style');
      const cssCode = [];
      styleTags.each((index, element) => {
        const code = $(element).html();
        if (code) {
          cssCode.push(code);
        }
      });

      const codeBlocks = [];
      codeBlocks.push(`\`\`\`html\n${body}\n\`\`\``);

      if (jsCode.length > 0) {
        codeBlocks.push('\n**Code JavaScript:**');
        codeBlocks.push('```javascript\n' + jsCode.join('\n') + '\n```');
      }

      if (cssCode.length > 0) {
        codeBlocks.push('\n**Code CSS:**');
        codeBlocks.push('```css\n' + cssCode.join('\n') + '\n```');
      }

      const codeContent = codeBlocks.join('\n');
      const codeBuffer = Buffer.from(codeContent, 'utf-8');

      const attachment = new Discord.MessageAttachment(codeBuffer, 'code.txt');

      message.reply({ files: [attachment] });
    });
  }
});

client.login(config.token);
