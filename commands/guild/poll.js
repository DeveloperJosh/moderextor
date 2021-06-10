const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('ms')
module.exports = {
  name: 'poll',
  category: 'guild',
  description: 'reset the prefix back to original for the bot',
  aliases: [],
  usage: '.poll <text>',
  run: async (client, message, args) => {
    try {
   if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
    const sayMessage = args.join(" ")

      if (!sayMessage) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to provide text\n\nExample :
          \`\`\`fix
.poll <text>`)
        return message.channel.send(error);
      } 
    

    const avatar = `${message.author.displayAvatarURL({dynamic: true})}`
    const embed = new Discord.MessageEmbed() 
    
    .setAuthor(`${message.author.username}`,avatar)   
    .setDescription(sayMessage)
    .addField("📊Status", "Waiting on the community's feedback please vote!", true) 
    .addField("🌴Community", "Hey if you want your suggestions to be here just type suggest with your message!", true)
    .setTimestamp()
    .setFooter("Community feedback")
     
       message.channel.send(embed).then(sentMessage => {
       message.delete()
       sentMessage.react('👍')
       sentMessage.react('👎')
})

    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}