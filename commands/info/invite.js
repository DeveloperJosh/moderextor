const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');

module.exports={
    name: 'invite',
    category: 'info',
    description: 'Use this to invite the bot to your server',
    aliases: ['inv'],
    usage: '.invite',
    run: async(client, message, args)=>{
    try{

     const embed = new Discord.MessageEmbed()

      .setTitle('Links')
      .addField('Add Bot', '[Add](https://discord.com/api/oauth2/authorize?client_id=816433892578820117&permissions=8&redirect_uri=https%3A%2F%2Fforums.influence-advertising.xyz%2Fauth%2Fdiscord&scope=bot)')
      .addField('Support Server', '[Join](https://discord.gg/PuvKU2k8eF)')
      .addField('Vote', '[Vote](https://top.gg/bot/816433892578820117/vote)')

      message.channel.send(embed)

     }catch(err) {
        console.log(err)
        return message.channel.send(`Error: ${err.message}`)
      }
   }
}