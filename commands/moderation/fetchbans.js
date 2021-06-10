const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'fetchbans',
    category: 'moderations',
    description: 'Fetches the number of bans of a guild',
    aliases: ['fb','bans'],
    usage: '.fetchbans',
    run: async(client, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            const banList = await message.guild.fetchBans();
            let em = new Discord.MessageEmbed()
            .setTitle(`🔴 Total number banned members of ${message.guild.name}: \`${banList.size}\``)
            .setColor('#2f3136')
            message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}