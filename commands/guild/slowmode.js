const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'slowmode',
  category: 'guild',
  description: 'Keeps a slowmode for a certain channel',
  aliases: ['sm'],
  usage: '.slowmode <time> [reason]',
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
      let time = args[0];
      let reason = args.slice(1).join(' ')
      if (!reason) reason = 'No reason specified.'
      if (!time || isNaN(time)) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`Seems that, it is either not a valid number, that you have provided as time, or you have to at least provide me the time for slowmode, Time can be 1 to 2880 seconds.\n\nExample :
                \`\`\`fix
.slowmode <time> [reason]\`\`\``)
        return message.channel.send(error);
      }
      let slow_mode = new Discord.MessageEmbed()
      slow_mode.setTitle(`🔴 Slowmode for this channel has been set to ${time}`)
      slow_mode.setColor('#2f3136')
        message.channel.setRateLimitPerUser(time, reason);
        message.channel.send(slow_mode)
    } catch (err) {
      console.log(err);
      return message.channel.send(`Welp, There was a error`)
    }
  }
}