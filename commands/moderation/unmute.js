const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'unmute',
  category: 'moderations',
  description: 'unmute a user',
  aliases: ['um'],
  usage: '.unmute <mention someone or provide their ID>',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_ROLES\` permission to use this command")
      const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember11);
      let mute = db.get(`botmuterole_${message.guild.id}`)
      let mute_role = message.guild.roles.cache.get(mute);
      let chx = db.fetch(`modlogs_${message.guild.id}`);
      const channel = message.guild.channels.cache.get(chx);
      if (member.id === message.author.id) return message.reply('You cannot use that command on yourself')

      if (mute === null) {
        let role_null = new Discord.MessageEmbed()
          .setTitle(`🔴 No mute role for ${message.guild.name} has been set yet. To set it, use \`.mute-role <mention the role or it\'s ID or name>\``)
          .setColor('RED')
        return message.channel.send(role_null)
      }
      else if (mute !== null) {
        if (!member) {
          const error = new Discord.MessageEmbed()
            .setTitle(`🔴 Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to provide me at least, the name or mention the role.\n\nExample :
                \`\`\`fix
.mute <mention a user>
OR
.mute <provide the user\'s ID>\`\`\``)
          return message.channel.send(error);
        }
        else if (member) {
          if (!member.roles.cache.has(mute_role.id)) {
            let me = new Discord.MessageEmbed()
              .setTitle(`🔴 ${member.user.tag}, are not muted`)
              .setColor('#2f3136')
            return message.channel.send(me)
          }
          /*if(member.permissions.has('ADMINISTRATOR')) {
              return message.channel.send('That person has higher role than you')
          }*/
          let got = db.get(`cachedroles_${message.guild.id}_${member.id}`)
          member.roles.set(got.cache).catch(console.error)
          await member.roles.remove(mute_role)
          let roleem = new Discord.MessageEmbed()
            .setAuthor(`Command used by ${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('#2f3136')
            .setDescription(`🟢 **${member.user.tag}** has been unmuted`)
            .setTimestamp(new Date())
          message.channel.send(roleem)

          if (chx != null) {
            db.get(`banlogcount_${message.guild.id}`)
            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
            let ban_log = new Discord.MessageEmbed()
            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Mention:** ${member}\n**Action:** Unmute`)
            ban_log.setColor(0xf94343)
            ban_log.setTimestamp(new Date())
            ban_log.setFooter(`Case #${ban_log_count}`)
            channel.send(ban_log)
          }
          else if (chx === null) {
            return;
          }
        }
      }
    } catch (err) {
      console.log(err);
      const error2 = new Discord.MessageEmbed()
        .setTitle(`🔴 Looks like there is an Issue!`)
        .setColor(0x2f3136)
        .setDescription(`You have to provide me at least, the name or mention the role.\n\nExample :
                \`\`\`fix
.unmute <mention a user>
OR
.unmute <provide the user\'s ID>\`\`\``)
      return message.channel.send(error2);
    }
  }
}