const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'delete-welcome-channel',
    category: 'guild',
    description: 'Remove your welcome channel.',
    aliases: ['dml'],
    usage: '.delete-welcome-channel',
    run: async(client, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
              let welcome_channel = db.get(`welchannel_${message.guild.id}`)
              if(welcome_channel !== null){
                await db.delete(`welchannel_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Welcome-Channel`)
                .setDescription(`🟢 Welcome-Channel for **${message.guild.name}**, was deleted`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.avatarURL())
                message.channel.send(wasset)
                }
              else if(welcome_channel === null){
                let guild_has_no_welcome_channel = new Discord.MessageEmbed()
                .setTitle(`🔴 ${message.guild.name} has no Welcome-Channel set yet. To set Welcome-Channel, user \`.Welcome-Channel <mention a channel>\``)
                .setColor('RED')
                return message.channel.send(guild_has_no_welcome_channel)
              }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}