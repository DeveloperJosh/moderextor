const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'unlock',
    category: 'moderations',
    description: 'Unlock a specific channel',
    aliases: [],
    usage: '.unlock',
    run: async(client, message, args)=>{
        try{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        if(!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let unlocked = new Discord.MessageEmbed()
        unlocked.setTitle(`🟢 Channel unlocked successfully`)
        unlocked.setColor('#2f3136')
        if(!chan) {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES : true });
            message.channel.send(unlocked)
        }
        else if(chan) {
            chan.updateOverwrite(chan.guild.roles.everyone, { SEND_MESSAGES : true });
            chan.send(unlocked)
            message.react('👍')
        }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}