const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'afk',
  category: 'users',
  description: 'Want to be AFK? You can use Suzushi.',
  aliases: [],
  usage: '.afk <reason>',
  run: async (client, message, args) => {
    try {
      let reason = args.join(" ");
      if (reason.toLowerCase().includes(`discord.gg`)) {
        return message.reply(`You can\'t have links in your reason`)
      }
      let afkcheck = db.fetch(`afk_${message.guild.id}_${message.author.id}`);
      if (!args[0]) {
        reason = "AFK";
      }
      if (afkcheck == null) {
        await db.set(`afk_${message.guild.id}_${message.author.id}`, {
          tag: message.author.username,
          reason: reason
        })
        message.channel.send(`I have set your AFK with reason: **${reason}**`)
        await message.react('👍');
      } else {
        return;
      }
    } catch (err) {
      console.log(err)
    }
  }
}
