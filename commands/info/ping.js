const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ping',
  category: 'info',
  description: 'get the ping of the bot',
  timeout: 10000,
  aliases: [],
  usage: `.ping`,
  run: async (client, message, args) => {
    try {
      const m = await message.channel.send("Getting Information")
      const pingg = m.createdTimestamp - message.createdTimestamp;
      const pi = new Discord.MessageEmbed()
      if (pingg >= 0 && pingg < 300) {
        pi.setColor(`#a1ee33`)
        pi.setDescription(`🟢 I feel fresh and active today :)\n\tMy Ping is \`${pingg}ms\` `)
        return m.edit(`\t`, pi);
      }
      else if (pingg > 300 && pingg <= 500) {
        pi.setColor('#f5bd1f')
        pi.setDescription(`🟡 I somewhat feel good today :|\n\tMy Ping is \`${pingg}ms\``)
        return m.edit(`\t`, pi);
      }
      else if (pingg > 500 && pingg <= 10000) {
        pi.setColor(`#f94343`)
        pi.setDescription(`🔴 I don\'t feel good today :(\n\tMy Ping is \`${pingg}ms\` `)
        return m.edit(`\t`, pi);
      }

    } catch (err) {
      return message.edit("\t", 'Oops! Looks like something went wrong, You can try again Later.')
    }
  },
};
