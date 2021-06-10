const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const db =require('quick.db');
module.exports = {
  name: 'userinfo',
  category: 'guild',
  timeout: 10000,
  description: 'get the into of a user',
  aliases: [],
  usage: '.userinfo <mention a user or provide their user ID>',
  run: async (client, message, args) => {
    try {
      const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
      const member = message.guild.member(mentionedddMember);

      let messages = db.fetch(`messages_${message.guild.id}_${member.id}`)
      let commands = db.fetch(`commands_ran_${message.guild.id}_${member.id}`)
    
      if (messages === null) messages = 0;
      if (commands === null) commands = 0;

      if (member) {
        let userinfo = new Discord.MessageEmbed()
        .setTitle('Userinfo')
        .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png' }))
        .setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Acc Made:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}\n**Messages:** ${messages}\n**Commands Ran:** ${commands}`)
        .setFooter("This is being remade")
        .setColor(0xf94343)
        .setTimestamp(new Date())
        message.channel.send(userinfo)
      }

    } catch (error) {
      return message.channel.send(`Error: \`${error.message}\``)
    }
  }
}