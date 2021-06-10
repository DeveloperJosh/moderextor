const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
  name: 'config',
  category: 'guild',
  description: 'Configuration of your server',
  aliases: ['c'],
  usage: '.config',
  run: async (client, message, args) => {
    try {
      let mod_logs = db.fetch(`modlogs_${message.guild.id}`);
      let channel;
      if (mod_logs === null) channel = 'No channel for mod-logs set yet.'
      else if (mod_logs !== null) channel = message.guild.channels.cache.get(mod_logs);

      let mute_role = db.get(`botmuterole_${message.guild.id}`)
      let mute;
      if (mute_role === null) mute = 'No role for mute set yet.'
      else if (mute_role !== null) mute = message.guild.roles.cache.get(mute_role);

      let extra_logs = db.get(`exlogs_${message.guild.id}`)
      let extra_logs_channel;
      if (extra_logs === null) extra_logs_channel = 'No channel for extra-logs set yet.'
      else if (extra_logs !== null) extra_logs_channel = message.guild.channels.cache.get(extra_logs)

      let welcome_channel = db.get(`welchannel_${message.guild.id}`)
      let welcome_channel_channel;
      if (welcome_channel === null) welcome_channel_channel = 'No channel for welcome-channel set yet.'
      else if (welcome_channel !== null) welcome_channel_channel = message.guild.channels.cache.get(welcome_channel)

      let no_prefix_for_bot = db.get(`PREFIX_${message.guild.id}`);
      let prefix;
      if(no_prefix_for_bot === null) prefix = '.'
      else if(no_prefix_for_bot !== null) prefix = no_prefix_for_bot;

      let config = new Discord.MessageEmbed()
        .setTitle(`Config for ${message.guild.name}`)
        .setDescription(`**Channel for Mod-logs:** ${channel}\n**Mute-role:** ${mute}\n**Channel for extra-logs:** ${extra_logs_channel}\n**Channel for Welcome-channel** ${welcome_channel_channel}\n**Prefix:** \`${prefix}\``)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL())
      return message.channel.send(config)
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}