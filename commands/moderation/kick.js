const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'kick',
  category: 'moderation',
  description: 'Kick a user from your server',
  aliases: [],
  usage: '.kick <user> [reason]',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You don\'t have the permission to use this command.\nYou need \`KICK_MEMBERS\` permission, to use this command.');
      if (!message.member.guild.me.hasPermission(['KICK_MEMBERS'])) return message.reply("I don\'t have the permission to \`KICK_MEMBERS\`.\nPlease provide me the following permission to use this command")
      let reason = args.slice(1).join(' ');
      let chx = db.fetch(`modlogs_${message.guild.id}`);
      const channel = message.guild.channels.cache.get(chx);
      const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember);
      if (!reason) reason = 'No reason specified.'
      if (!member) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide the id of the user, whom you are kicking.\n\nExample :
          \`\`\`fix
.kick <mention a user> [reason]
OR
.kick <ID of a user> [reason]\`\`\``)
        return message.channel.send(error);
      }
      if (member.id === message.author.id) return message.reply('Uh! You can\'t kick yourself, you know? :/')
      if (message.mentions.members.first() !== undefined) {
        if (message.mentions.members.first().id === client.user.id) return message.channel.send("Why do you want to kick me 😶?")
      }
      if (member) {
        try {
          let dm = new Discord.MessageEmbed()
            .setTitle(`User kicked`)
            .setDescription(`You were kicked from ${message.guild.name} for reason: ${reason}.`)
            .setColor(0xf94343)
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.avatarURL())
          member.send(dm)
        } catch (err) {
          message.channel.send('Couldn\'t DM the member, since their DMs are closed.')
          console.log(err);
        }
        member.kick(reason).then(async () => {

          let kicked = new Discord.MessageEmbed()
          kicked.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
          kicked.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Mention:** ${member}\n**Action:** Kick\n**Reason:** ${reason}`)
          kicked.setColor('RED')
          kicked.setTimestamp(new Date())
          await message.channel.send(kicked)
          await message.react('👍')
        })

        if (chx != null) {
          db.get(`banlogcount_${message.guild.id}`)
          let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
          let kick_log = new Discord.MessageEmbed()
          kick_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
          kick_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Action:** Kick\n**Reason:** ${reason}`)
          kick_log.setColor(0xf94343)
          kick_log.setTimestamp(new Date())
          kick_log.setFooter(`Case #${ban_log_count}`)
          channel.send(kick_log)
        }
        else if (chx === null) {
          return;
        }
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}