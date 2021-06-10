const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'warns',
    category: 'moderations',
    description: 'get the warnings of a user',
    aliases: ['warnings'],
    usage: '.warns <mention a user>',
    run: async(client, message, args)=>{
      try{
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_MESSAGES\` permission, to use this command.");
          const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
          const member = message.guild.member(mentionedddMember);
            if(!member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`🔴 Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whos warnings you are checking.\n\nExample :
                \`\`\`fix
.warnings <mention a user>
OR
.warnings <ID of a user>\`\`\``)
                return message.channel.send(error);
            }
                        if(member.user.bot) {
                return message.channel.send(`Bots do not have warnings`);
            }
            if(member.id === message.guild.ownerID) {
                return message.channel.send('You cannot use this command on the guild owner')
            }
            else if(member){
                let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
                let reasons = db.get(`warnings.reason_${message.guild.id}_${member.id}`)
    
            if (warnings === null) warnings = 0;
            if (reasons !== undefined){
              let warn_embed = new Discord.MessageEmbed()
              .setAuthor(`${member.user.tag} - ${member.user.id} has ${warnings} warning(s)`, member.user.displayAvatarURL({dynamic: true, formant: 'png'}))
              .setDescription(`${reasons}`)
              .setFooter(client.user.username, client.user.avatarURL())
              .setTimestamp(new Date())
              .setColor('#2f3136')
              return message.channel.send(warn_embed);
            }
            else if(warnings === 0){
              let user_has_no_warnings = new Discord.MessageEmbed()
              .setTitle(`🔴 ${member.user.tag} has no warnings yet. To warn them, user \`.warn <mention the user or their ID> <reason>\``)
              .setColor('RED')
              return message.channel.send(user_has_no_warnings)
            }
        }
      }catch(err){
            console.log(err);
            return message.channel.send(`Error: ${err.message}`)
        }
    }
}
