const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'editsnipe',
    category: 'misc',
    description: 'Snipe a message which was edited recently',
    aliases: ['es'],
    usage: '.editsnipe',
    run: async(client, message, args)=>{
        try{
        const msm = client.edits.get(message.channel.id)
        if(!msm) return message.channel.send("There are no messages that were edited recently")
        const edi = new MessageEmbed()
        edi.setAuthor(`Edited by ${msm.author.tag}`, msm.author.displayAvatarURL({ dynamic: true, size: 256 }))
        edi.setColor(0x2f3136)
        edi.setDescription(msm.content)
        edi.setTimestamp(new Date())
        message.channel.send(edi)
        }catch(err){
            return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
          }
    }
}