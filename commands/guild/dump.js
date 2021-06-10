const Discord = require('discord.js');
const { MessageEmbed, splitMessage } = require('discord.js');
module.exports = {
    name: 'dump',
    category: 'guild',
    description: 'dump the members of a certain role',
    aliases: [],
    usage: '.dump <role name or role ID>',
    run: async (client, message, args) => {

        try {
            const role = message.guild.roles.cache.find(
                (role) => role.name.toLowerCase() === args.join(' ').toLowerCase() || role.id === args.join(' ')
            );
            if (!args.join(' ')) {
                const error = new Discord.MessageEmbed()
                    .setTitle(`🔴 Looks like there is an Issue!`)
                    .setColor(0x2f3136)
                    .setDescription(`You have to provide me at least, the name or the ID of the role.\n\nExample :
            \`\`\`fix
.dump <role name>
OR
.dump <role ID>\`\`\``)
                return message.channel.send(error);
            }
            if (!role)
                return message.channel.send(`I am unable find any role by the name, \`${args.join(' ')}\``);
            const ListEmbed = new Discord.MessageEmbed()
                .setTitle(`Users with the role \`${role.name}\` - \`${role.id}\``)
                .setColor(0x2f3136)
                .setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
                .setDescription(role.members.map((m) => m.user.tag + ` - \`${m.user.id}\``).join(`\n`))
                .setTimestamp(new Date())
            const splitDescription = splitMessage(ListEmbed.description, {
                maxLength: 2048,
                char: "\n",
                prepend: "",
                append: ""
            });

            splitDescription.forEach(async (m) => {
                ListEmbed.setDescription(m);
                message.channel.send(ListEmbed);
            });
        } catch (err) {
            message.channel.send(`Oops! Looks like there\'s an error : \`${err.message}\``)
            console.log(err)
        }
    }
};