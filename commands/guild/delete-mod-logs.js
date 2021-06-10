const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'delete-mod-logs',
    category: 'guild',
    description: 'Remove your mod logs channel',
    aliases: ['dml'],
    usage: '.delete-mod-logs',
    run: async(client, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
              let mod_logs = db.get(`modlogs_${message.guild.id}`)
              if(mod_logs !== null){
                await db.delete(`modlogs_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Mod-logs`)
                .setDescription(`🟢 Mod-logs for **${message.guild.name}**, was deleted`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.avatarURL())
                message.channel.send(wasset)
                }
              else if(mod_logs === null){
                let guild_has_no_mod_logs = new Discord.MessageEmbed()
                .setTitle(`🔴 ${message.guild.name} has no mod-logs set yet. To set mod-logs, user \`.mod-logs <mention a channel>\``)
                .setColor('RED')
                return message.channel.send(guild_has_no_mod_logs)
              }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}