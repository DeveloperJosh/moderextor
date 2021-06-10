const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'roleinfo',
    category: 'guild',
    description: 'Get the info of a role',
    aliases: ['ri'],
    usage: '.roleinfo <role ID or role name>',
    run: async(client, message, args)=>{
        try{
        if(!args.join(' ')) {
            const error = new Discord.MessageEmbed()
            .setTitle(`🔴 Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to provide me at least, the name or the ID of the role.\n\nExample :
            \`\`\`fix
.roleinfo <role name or mention the role>
OR
.roleinfo <role ID>\`\`\``)
            return message.channel.send(error);
        }
        else if(args.join(' ')){
        const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === args.join(' ') || role.id === args.join(' ')
        ) || message.mentions.roles.first();
        let rolePermissions = role.permissions.toArray();
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`Role Info of ${role.name}`)
        embed.setColor(0x2f3136)
        embed.setDescription(`Permissions :\n${rolePermissions.join(', ')}`)
        embed.setTimestamp(new Date())
        embed.setFooter("No name", client.user.avatarURL())
        return message.channel.send(embed)
        }
        }catch(err){
            console.log(err)
            return message.channel.send(`Looks like I was unable to find that role. Please double check the spelling,\nOr try providing the ID of the role.`)
        }
    }
}