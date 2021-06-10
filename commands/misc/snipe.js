const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'snipe',
    category: 'misc',
    description: 'Snipes a deleted message',
    aliases: ['s'],
    usage: '.snipe',
    run: async(client, message, args)=>{
        try{
        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("I see, There are no messages currently deleted")
        const sni = new MessageEmbed()
        sni.setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true, size: 256 }))
        sni.setColor(0x2f3136)
        sni.setDescription(msg.content)
        sni.setTimestamp(new Date())
        if(msg.image) sni.setImage(msg.image)
        message.channel.send(sni)
        }catch(err){
            return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
          }
    }
}