const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { client, Message, Util } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'steal-emoji',
  category: 'guild',
  description: 'steal emojis from any server, and add them to your server, with this bot',
  aliases: ['se'],
  usage: '.steal-emoji <emoji-1> [emoji-2] [emoji-3] [em...]',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_EMOJIS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_EMOJIS\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(["MANAGE_EMOJIS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_EMOJIS\` permission, to use this command.");
      if (!args.length) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`Please specify at least some emojis\n\nExample :
                \`\`\`fix
.steal-emoji <emoji-1> [emoji-2] [emoji-3] [em...]\`\`\``)
        return message.channel.send(error);
      }
      for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);
        if (parsedEmoji.id) {
          const extension = parsedEmoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
          message.guild.emojis
            .create(url, parsedEmoji.name)
            .then((emoji) => message.channel.send(`Added: ${emoji}`));
        }
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}