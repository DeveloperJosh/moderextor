const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'mute-role',
  category: 'moderation',
  description: 'set the mute-role for your server!',
  aliases: ['mr'],
  usage: '.mute-role <mention a role or provide a role ID or the role name>',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
      const muterole = message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === args.join(' ').toLowerCase() || role.id === args.join(' ')
      ) || message.mentions.roles.first();
      if (!args[0] || !muterole) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide me the role\'s name or provide me the role\'s ID.\n\nExample :
                \`\`\`fix
.muterole <mention the role>
or
.muterole <provide the name of the role>
or
.muterole <provide the role\'s ID>\`\`\``)
        return message.channel.send(error);
      }
      else if (muterole) {
        db.set(`botmuterole_${message.guild.id}`, muterole.id)
        const set = new Discord.MessageEmbed()
          .setTitle(`🟢 Muterole`)
          .setDescription(`Muterole for **${message.guild.name}**, has been set to ${muterole}`)
          .setColor('#2f3136')
        return message.channel.send(set)
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}