const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'lock',
    category: 'moderations',
    description: 'Lock a specific channel',
    aliases: [],
    usage: '.lock',
    run: async(client, message, args)=>{
        try{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        if(!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'
        let locked = new Discord.MessageEmbed()
        locked.setTitle(`🔴 Channel locked successfully. To unlock the channel use \`.unlock [mention a channel]\``)
        locked.setColor('#2f3136')
        if(!chan) {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES : false });
            message.channel.send(locked)
        }
        else if(chan) {
            chan.updateOverwrite(chan.guild.roles.everyone, { SEND_MESSAGES : false });
            chan.send(locked)
            message.react('👍')
        }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}