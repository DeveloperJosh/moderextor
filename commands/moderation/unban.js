const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'unban',
  category: 'moderations',
  description: 'unban the bad boys that want to get unbanned.',
  aliases: [],
  usage: '.unban <provide their user ID>',
  run: async (client, message, args) => {
    try {

        let userID = args[0]
        message.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return 
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return
        message.guild.members.unban(bUser.user)
  })

  if (!userID) {
    return message.channel.send('You must provide a id');
  }

        let warn = new Discord.MessageEmbed()
        warn.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
        warn.setDescription(`The User has been Unbanned`)
        warn.setColor(0xf94343)
        warn.setTimestamp(new Date())
        message.channel.send(warn)
    } catch (error) {
      return message.channel.send(`Error: \`${error.message}\``)
    }
  }
}