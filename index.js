const Discord = require('discord.js');
const { Collection, Client, MessageEmbed, Intents } = require('discord.js');
require('dotenv').config();
const { MessageAttachment } = require('discord.js');
const date = new Date();
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const db = require('quick.db');
const client = new Discord.Client({
	disableEveryone: true,
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

let token = process.env.TOKEN;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
const Timeout = new Set();
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	setInterval(() => {
		const statuses = [
			`.help`,
			`Your Server`,
			`Your Staff`,
			`Funny Memes`,
			`You sleep`,
			`All of you`,
			`The Logs`,
      `${client.guilds.cache.size} servers`
		];
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.setActivity(`${status}`, { type: 'WATCHING' });
	}, 10000);
	console.log(
		`Hello, I am online on ${client.guilds.cache.size} servers and serving ${
			client.users.cache.size
		} users`
	);
});

client.on('message', async message => {

  if(message.author.bot) return;

  const user = message.author

	let PREFIX_FOR_BOT = db.get(`PREFIX_${message.guild.id}`);
	if (PREFIX_FOR_BOT === null) PREFIX = '.';
	else if (PREFIX_FOR_BOT !== null) PREFIX = PREFIX_FOR_BOT;

	message.guild.me.setNickname(`[${PREFIX}] ${client.user.username}`);

	let afk = await db.fetch(`afk_${message.guild.id}_${message.author.id}`);
	if (afk !== null) {
		db.delete(`afk_${message.guild.id}_${message.author.id}`);
		message.reply(`Welcome back, I successfully removed your AFK`);
	}

	let user_1 = message.mentions.users.first();
	if (user_1) {
		let id = user_1.id;
		let afkcheck = db.fetch(`afk_${message.guild.id}_${id}`);
		if (afkcheck !== null) {
			message.reply(
				`That user is currently AFK with reason: ${afkcheck.reason}`
			);
		}
	}
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return;
	if (!message.guild) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);
	const args = message.content
		.slice(PREFIX.length)
		.trim()
		.split(/ +/g);
	const com = args.shift().toLowerCase();
	if (com.length == 0) return;
	const command =
		client.commands.get(com) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(com));
	if (command) {
		if (command.timeout) {
			if (Timeout.has(`${message.author.id}${command.name}`)) {
				let um = new Discord.MessageEmbed();
				um.setTitle('Hold Up ✋!');
				um.setDescription(
					`You have to wait more ${ms(
						command.timeout
					)}, to use this command again`
				);
				um.addField(
					'Why?',
					'Because this system was installed, in order not to flood the chat with bot commands everywhere',
					true
				);
				um.setFooter(`This message gets deleted after 10s`);
				um.setTimestamp(new Date());
				um.setColor(0xf94343);
				return message
					.reply(um)
					.then(message => message.delete({ timeout: 10000 }));
			} else {
				Timeout.add(`${message.author.id}${command.name}`);
				setTimeout(() => {
					Timeout.delete(`${message.author.id}${command.name}`);
				}, command.timeout);
			}
		}
		command.run(client, message, args);
	}
});

client.on("guildMemberAdd", async (member) => {

        let chx = db.fetch(`welchannel_${member.guild.id}`);
      const channel = member.guild.channels.cache.get(chx);
if (chx === null) {
  return;
}

const welcome = new Discord.MessageEmbed()
 ///.setTitle(`${member.user.tag}`)
  .setColor('RANDOM')
  .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png' }))
  .addField(`Welcome`, `Welcome ${member.user.tag} to ${member.guild.name}`)
  .addField(`Warning Info`, `This system is being remade`)
  .setFooter(`Member Count ${member.guild.memberCount}`)
  channel.send(`<@${member.user.id}>`, welcome)

});

client.on("messageDelete", async function(message) {
      let chx = db.fetch(`modlogs_${message.guild.id}`);
      const channel = message.guild.channels.cache.get(chx);
if (chx === null) {
  return;
}
if (message.author.bot) {
  return;
}

let logs = await message.guild.fetchAuditLogs({type: 72});
let entry = logs.entries.first();

const embed = new Discord.MessageEmbed()
.setTitle('Message Deleted!')
.addField('Deleted Message', message)
.addField('Deleted By', `${entry.executor}`)
.setFooter(`Message was deleted at`)
.setTimestamp(new Date())

channel.send(embed)

});

client.snipes = new Map();
client.on('messageDelete', function(message, channel) {
	if (message.author.bot) return;
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null
	});
});

client.edits = new Map();
client.on('messageUpdate', function(message, channel) {
	if (message.author.bot) return;
	client.edits.set(message.channel.id, {
		content: message.content,
		author: message.author
	});
});

client.login(token);
