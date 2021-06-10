const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'reset-prefix',
  category: 'guild',
  description: 'reset the prefix back to original for the bot',
  aliases: ['rp'],
  usage: '.reset-prefix',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_GUILD\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(['MANAGE_GUILD'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_GUILD\` permission to use this command")
      let prefix_of_bot = db.get(`PREFIX_${message.guild.id}`)
      if (prefix_of_bot !== ".") {
        let r = db.set(`PREFIX_${message.guild.id}`, ".")
        let reset_prefix = new Discord.MessageEmbed()
          .setTitle('Reset Prefix')
          .setDescription(`Prefix for ${message.guild.name} has been set back to \`${r}\``)
          .setColor(`#2f3136`)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(reset_prefix)
      } else if (prefix_of_bot === ".") {
        let bot_prefix = db.get(`PREFIX_${message.guild.id}`)
        let no_custom_prefix = new Discord.MessageEmbed()
          .setDescription(`No custom prefix for ${message.guild.name} has been set yet. The prefix currently now is \`${bot_prefix}\`. To set a custom prefix for this server, you can use the \`.set-prefix <prefix>\``)
          .setColor(`#2f3136`)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(no_custom_prefix)
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}