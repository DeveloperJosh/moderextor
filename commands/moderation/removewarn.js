const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: 'removewarn',
  category: 'moderations',
  description: 'see how many warns a user has.',
  aliases: ['rwarn','rwarns'],
  usage: '.removewarn <mention a user or provide their user ID>',
  run: async (client, message, args) => {
    try {
      const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember);
      let messageFilter = (m) => m.author.id === message.author.id;
      if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_MESSAGES\` permission, to use this command.");
      if(!message.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_MESSAGES\` permission to use this command")
      if (!member) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide the id of the user, \n\nExample :
          \`\`\`fix
.removewarn <mention a user>
OR
.removewarns <ID of a user>\`\`\``)
        return message.channel.send(error);
      }

      if (member) {
        let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
            if(warnings === null) {
                const nowarn = new Discord.MessageEmbed()
                .setTitle(`🔴 ${member.user.tag} don\'t have any warnings yet. If you want to warn them, use \`.warn <mention a user or use user ID> <provide a reason>\``)
                .setColor('#ff0808')
                return message.channel.send(nowarn);
            }
        else if(warnings !== null){
            db.delete(`warning_${message.guild.id}_${member.id}`)
            db.delete(`warnings.reason_${message.guild.id}_${member.id}`)
            let deleted = new Discord.MessageEmbed()
          deleted.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
          deleted.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Mention:** ${member}\n**Number of warns removed:** ${warnings}`)
          deleted.setColor(0xf94343)
          deleted.setTimestamp(new Date())
          await message.channel.send(deleted)
          }
    }
    } catch (error) {
      return message.channel.send(`Error: \`${error.message}\``)
    }
  }
}