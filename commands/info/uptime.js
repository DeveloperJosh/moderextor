const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports={
    name: 'uptime',
    category: 'info',
    timeout: 10000,
    description: 'get the uptime of the bot',
    timeout: 10000,
    aliases: [],
    usage: '.uptime',
    run: async(client, message, args)=>{ 
		try {

            var uptime = moment.duration(client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]')

     const Uptime = new MessageEmbed()

     .setTitle('Bot Uptime')
     .setDescription(`❯\u2000\Uptime • **${uptime}**!`)

     message.channel.send(Uptime)

        }catch(err){
            return message.edit("\t",'Oops! Looks like something went wrong, You can try again Later.')
        }
	},
};
