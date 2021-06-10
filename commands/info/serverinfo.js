const Discord = require('discord.js');
const moment = require('moment');

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = {
	name: 'serverinfo',
	category: 'info',
	description: 'This gives you info on the server',
	aliases: [],
	usage: '.serverinfo',
	run: async (client, message, args) => {
		try {
		
            const guild = message;
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const ServerInfoEmbed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor('BLUE')
            .setDescription(`Shows the server info for \`${message.guild.name}\``)
            .addField('General Info', [
                `**ID:** ${message.guild.id}`,
                `**Name:** ${message.guild.name}`,
                `**Owner:** ${message.guild.owner} (${message.guild.owner.id})`,
                `\u200b`
            ])
            .addField('Boost Info', [
                `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
                `\u200b`
            ])
            .addField('Counters', [
                `**Role Count:** ${roles.length}`,
                `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**Bots:** ${members.filter(member => member.user.bot).size}`,
                `**Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**Emoji Count:** ${emojis.size}`,
                `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `\u200b`
            ])
            .addField('Additional Info', [
                `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Verification Level:**  ${verificationLevels[message.guild.verificationLevel]}`,
                `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                `**Region:** ${regions[message.guild.region]}`,
                `\u200b`
            ])
            .setTimestamp()
            .setFooter(`Requested By: ${message.author.username}`)
        
        message.channel.send(ServerInfoEmbed)
			
		} catch (err) {
			console.log(err);
			return message.channel.send(`Error: ${err.message}`);
		}
	}
};
