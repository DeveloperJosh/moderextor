const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { now } = require('moment');
const db = require('quick.db');
module.exports = {
  name: 'warn',
  category: 'moderations',
  description: 'warn a user, if they don\'t follow your rules.',
  aliases: [],
  usage: '.warn <mention a user or provide their user ID> <provide a reason>',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_MESSAGES\` permission, to use this command.");
      let chx = db.fetch(`modlogs_${message.guild.id}`);
      const channel = message.guild.channels.cache.get(chx);
      const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember11);
      var reason = args.slice(1).join(' ')
      if (!member) {
        const error = new Discord.MessageEmbed()
          .setTitle(`:red_circle: Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
.warn <mention a user> <provide a reason>
OR
.warn <ID of a user> <provide a reason>\`\`\``)
        return message.channel.send(error);
      }
      if (member.user.bot) {
        return message.channel.send('You cannot warn Bots')
      }
      if (member.id === message.author.id) {
        return message.channel.send('You cannot warn yourself')
      }
      if (member.id === message.guild.ownerID) {
        return message.channel.send('You cannot use this command on the guild owner')
      }
      if (!reason) {
        const error1 = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
.warn <mention a user> <provide a reason>
OR
.warn <ID of a user> <provide a reason>\`\`\``)
        return message.channel.send(error1);
      }
      let mute_role = db.get(`botmuterole_${message.guild.id}`)
      let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
      if (warnings >= 3) {
        console.log(`${member.user.tag} have 3 warns now!`)
      }

      /*if (warnings > 2) {
        if (mute_role !== null) {
          if (member.roles.cache.has(mute_role.id)) return;
          else if (!member.roles.cache.has(mute_role.id)) {
            member.roles.add(mute_role)
            let roleem = new Discord.MessageEmbed()
              .setAuthor(`Automod`, client.user.displayAvatarURL())
              .setColor('#2f3136')
              .setDescription(`🟢 **${member.user.tag}** has been muted`)
              .setTimestamp(new Date())
            message.channel.send(roleem)
          }
        }
      }*/
      if (reason) {
        db.push(`warnings.reason_${message.guild.id}_${member.id}`, [
          `\nModerator ${message.author.tag}`,
          `on \`${new Date().toLocaleString()}\``,
          `for reason: **${reason}**`
        ])
        db.add(`warning_${message.guild.id}_${member.id}`, 1)
        let number_of_warns = db.get(`warning_${message.guild.id}_${member.id}`)
        const warnedd = new Discord.MessageEmbed()
          .setTitle(`🔴 ${member.user.tag} were warned successfully. Use \`.warnings (mention them)\` to check their warnings.`)
          .setColor('#FF0000')
          .setDescription(`Reason: ${reason}\nNumber of warns: ${number_of_warns}`)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL())
        message.channel.send(warnedd);
        await member.send(`You were warned in, **${message.guild.name}** by **${message.author.tag}** for reason: ${reason}, at ${new Date().toLocaleString()}`)
        if (chx != null) {
          let warn3 = db.get(`warning_${message.guild.id}_${member.id}`)
          db.get(`banlogcount_${message.guild.id}`)
          let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
          let ban_log = new Discord.MessageEmbed()
          ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
          ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Action:** Warn\n**Reason:** ${reason}\n**Number of warns:** ${warn3}`)
          ban_log.setColor(0xf94343)
          ban_log.setTimestamp(new Date())
          ban_log.setFooter(`Case #${ban_log_count}`)
          channel.send(ban_log)
        }
        else if (chx === null) {
          return;
        }
      }
    } catch (err) {
      message.channel.send(`Error: ${err.message}`);
      console.log(err)
    }
  }
}