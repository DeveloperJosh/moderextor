const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'delete-mute-role',
    category: 'guild',
    description: 'Delete the mute-role for your server.',
    aliases: ['dmr'],
    usage: '.delete-mute-role',
    run: async(client, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
              let mute_role = db.get(`botmuterole_${message.guild.id}`)
              if(mute_role !== null){
                await db.delete(`botmuterole_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Mute-role`)
                .setDescription(`🟢 Mute-role for **${message.guild.name}**, was deleted`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.avatarURL())
                message.channel.send(wasset)
                }
              else if(mute_role === null){
                let guild_has_no_mute_role = new Discord.MessageEmbed()
                .setTitle(`🔴 ${message.guild.name} has no mute-role set yet. To set mod-logs, use \`.mute-role <role name or role ID or mention the role>\``)
                .setColor('RED')
                return message.channel.send(guild_has_no_mute_role)
              }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}