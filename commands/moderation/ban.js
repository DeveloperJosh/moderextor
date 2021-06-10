const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'ban',
  category: 'moderations',
  description: 'ban a user, if they don\'t follow your rules.',
  aliases: [],
  usage: '.ban <mention a user or provide their user ID> [provide a reason]',
  run: async (client, message, args) => {
    try {
      const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember);
      let ban_reason = args.slice(1).join(' ')
      let chx = db.fetch(`modlogs_${message.guild.id}`);
      const channel = message.guild.channels.cache.get(chx);
      if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(['BAN_MEMBERS'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`BAN_MEMBERS\` permission to use this command")
      if (!ban_reason) ban_reason = 'No reason provided';
      if (!member) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide the id of the user, whom you are banning.\n\nExample :
          \`\`\`fix
.ban <mention a user> [reason]
OR
.ban <ID of a user> [reason]\`\`\``)
        return message.channel.send(error);
      }
      if (member.id === message.author.id) {
        return message.channel.send('You cannot ban yourself')
      }



      if (member) {
        try {
          let dm = new Discord.MessageEmbed()
            .setTitle(`User Banned`)
            .setDescription(`You were banned from ${message.guild.name} for reason: ${ban_reason}.`)
            .setColor(0xf94343)
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.avatarURL())
          await member.send(dm)
        } catch (err) {
          message.channel.send('Couldn\'t DM the member, since their DMs are closed.')
        }

        await member.ban({ days: 7, reason: ban_reason })
        let warn = new Discord.MessageEmbed()
        warn.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
        warn.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Mention:** ${member}\n**Action:** Ban\n**Reason:** ${ban_reason}`)
        warn.setColor(0xf94343)
        warn.setTimestamp(new Date())
        await message.channel.send(warn)

        if (chx != null) {
          db.get(`banlogcount_${message.guild.id}`)
          let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
          let ban_log = new Discord.MessageEmbed()
          ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
          ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Action:** Ban\n**Reason:** ${ban_reason}`)
          ban_log.setColor(0xf94343)
          ban_log.setTimestamp(new Date())
          ban_log.setFooter(`Case #${ban_log_count}`)
          channel.send(ban_log)
        }
        else if (chx === null) {
          return;
        }
      }
    } catch (error) {
      return message.channel.send(`Error: \`${error.message}\``)
    }
  }
}
