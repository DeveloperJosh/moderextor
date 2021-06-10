const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'soft-ban',
    category: 'moderation',
    description: 'Soft ban a user',
    aliases: ['sb'],
    usage: '.soft-ban <mention the user you want to ban> <number of days for ban> [reason]',
    run: async(bot, message, args)=>{
        try{
        let chx = db.fetch(`modlogs_${message.guild.id}`);
        const channel = message.guild.channels.cache.get(chx);
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.');
        if(!message.member.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply("I don\'t have the permission to \`BAN_MEMBERS\`.\nPlease provide me the following permission to use this command")  
        const userb = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const memberb = message.guild.member(userb);
        var guildID = bot.guilds.cache.get(message.guild.id).id;
        let bareason = args.slice(2).join(" ")
        let number_of_days = args.slice(1).join(" ")
        if(isNaN(number_of_days)) return message.channel.send('That doesn\'t seem like a valid number.')
        if (!userb || !number_of_days) {
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to at least mention, or provide me the ID of the member, you want to ban.\n\nExample :
            \`\`\`fix
.soft-ban <mention an user> <number of days for ban> [reason]
OR
.soft-ban <the ID of an user> <number of days for ban> [reason]\`\`\``)
            return message.channel.send(error);
        }
        if(userb.id === message.author.id) return message.reply('Uh! You can\'t ban yourself, you know? :/');
        else if (userb) {
            if(!bareason) bareason = "No reason was provided"
            if (memberb) {
                let uban = new Discord.MessageEmbed()
                uban.setAuthor("Soft-Ban command used by " + message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                uban.setDescription(`${memberb.user.tag} was successfully banned from ${message.guild.name} 🤕.\nReason: ${bareason}\nUser ID [ ${memberb.id} ]\nNumber of days: **${number_of_days}**`)
                uban.setColor(0xf94343)
                uban.setTimestamp(new Date())
                uban.setFooter("Suzushi", bot.user.avatarURL())
                await message.channel.send(uban);
                await message.react('👍');
                await bot.guilds.resolve(guildID).members.resolve(userb).ban({days: number_of_days ,reason: bareason}).then(async () => {
                }).catch(err => {
                    message.channel.send('Seems like, I was unable to ban that user. You can try again later')
                    message.react('👎');
                    console.log(err);
                });

            } else {
                message.reply("The user isn\'t in this server").then(message => message.delete({ timeout: 10000 }));
            }
        } else {
            message.reply('That user is not in the server :( ').then(message => message.delete({ timeout: 10000 }));
        }
        if(chx != null) {
            db.get(`banlogcount_${message.guild.id}`)
            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
            let ban_log = new Discord.MessageEmbed()
            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            ban_log.setDescription(`**Member:** ${memberb.user.tag} - (${memberb.id})\n**Action:** Soft-Ban\n**Reason:** ${bareason}\n**Number of Days:** ${number_of_days}`)
            ban_log.setColor(0xf94343)
            ban_log.setTimestamp(new Date())
            ban_log.setFooter(`Case #${ban_log_count}`)
            channel.send(ban_log)
        }
        else if(chx === null) {
            return;
        }
    }catch(err) {
        console.log(err)
        return message.channel.send('Oops looks like an error occured')
    }
    }
}
