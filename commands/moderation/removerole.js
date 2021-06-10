const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'removerole',
    category: 'moderations',
    description: 'Tired of removing roles manually? Don\'t worry, This bot can help you addrole to a user, swiftly.',
    aliases: ['rrole'],
    usage: '.removerole <mention someone> <mention a role>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_ROLES\` permission to use this command")
            const role = message.guild.roles.cache.find(
                (role) => role.name.toLowerCase() === args.slice(1).join(' ').toLowerCase() || role.id === args.slice(1).join(' ')
            ) || message.mentions.roles.last();
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            if(!role || !member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`🔴 Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to provide me at least, the name or mention the role.\n\nExample :
                \`\`\`fix
.removerole <mention a user> <mention a role or provide the role\'s name>
OR
.removerole <provide the user\'s ID> <provide a role's ID>\`\`\``)
                return message.channel.send(error);
            }
            else if(role && member){
                if(!member.roles.cache.has(role.id)) {
                    let me = new Discord.MessageEmbed()
                    .setTitle(`🔴 ${member.user.tag}, don\'t have the role!`)
                    .setColor('#2f3136')
                    return message.channel.send(me)
                }
                /*if(member.permissions.has('ADMINISTRATOR')) {
                    return message.channel.send('That person has higher role than you')
                }*/
                if(role.permissions.has('ADMINISTRATOR')){
                    return message.channel.send('I can\'t interpret with a highest role.')
                }
                member.roles.remove(role)
                let roleem = new Discord.MessageEmbed()
                .setAuthor(`Command used by ${message.author.tag}`,message.author.displayAvatarURL())
                .setColor('#2f3136')
                .setDescription(`🟢 ${role} role has been removed from **${member.user.tag}**`)
                .setTimestamp(new Date())
                return message.channel.send(roleem)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}