const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
let os = require('os')
module.exports={
    name: 'info',
    category: 'info',
    description: 'This is a info command it gives you all of the info about the bot',
    aliases: ['botinfo'],
    usage: '.info',
    run: async(client, message, args)=>{
    try{

      const info = new Discord.MessageEmbed()
      .setTitle('Botinfo')
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#6C70EB')
      .setFooter('Made with ❤ by ♡𝔹𝕝𝕦𝕖♡#1270 & Awish#6969 using Discord.js')
      .addField('❯\u2000\Dev Info', `•\u2000\**Developers:** ♡𝔹𝕝𝕦𝕖♡#1270 & Awish#6969`)
      .addField('❯\u2000\Miscellaneous', `•\u2000\**Commands:** ${client.commands.size}`)
      .addField('❯\u2000\Servers', `•\u2000\**Servers count:** ${client.guilds.cache.size}`)
      .addField('❯\u2000\Users', `•\u2000\**Users count:** ${client.users.cache.size}`)
      .addField('❯\u2000\Channels', `•\u2000\**Channels count:** ${client.channels.cache.size}`)
      .addField('❯\u2000\Operating System', `•\u2000\**OS:** ${os.platform()} ${os.arch()}bit`)
      .addField('❯\u2000\Info', `•\u2000\**About:** This is a public moderation bot created by Influence Advertising. This bot was created because all other ad servers are making bump bots and we didn't want to follow the crowd. We had two of our best developers make this bot and we hope you love it just as much as we do.`)

      message.channel.send(info)

     }catch(err) {
        console.log(err)
        return message.channel.send(`Error: ${err.message}`)
      }
   }
}