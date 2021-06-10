const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'set-prefix',
  category: 'guild',
  description: 'Set a custom prefix for the bot. You can also use .set-prefix <prefix>$space for giving a space after the prefix.',
  aliases: ['sp'],
  usage: '.set-prefix <prefix>',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_GUILD\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(['MANAGE_GUILD'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_GUILD\` permission to use this command")
      let custom_prefix = args.slice(0).join(' ');
      if (!custom_prefix) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to provide me at a prefix.\n\nExample :
            \`\`\`fix
.set-prefix <prefix>
Or
.set-prefix <prefix>$space\`\`\``)
        return message.channel.send(error);
      }
      else if (custom_prefix) {
        let prefix_for_bot = db.set(`PREFIX_${message.guild.id}`, custom_prefix)
        let no_prefix_for_bot = db.get(`PREFIX_${message.guild.id}`)
        let prefix_set = new Discord.MessageEmbed()
          .setTitle(`Custom Prefix`)
          .setColor('#2f3136')
          .setDescription(`Prefix for ${message.guild.name} has been now set as \`${no_prefix_for_bot}\``)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(prefix_set);
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}