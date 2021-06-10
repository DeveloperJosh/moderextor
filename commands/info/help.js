const Discord = require('discord.js');
const { MessageEmbed, splitMessage } = require('discord.js');
const db = require('quick.db')
const reactionPages = async (message, author, options, page, retries) => {
  const restartLoop = async () => { await reactionPages(message, author, options, page, retries); }
  const filter = (reaction, user) => {
    if (options.allowOtherUserReactions) {
      return Object.values(options.emojis).includes(reaction.emoji.name);
    } else {
      return Object.values(options.emojis).includes(reaction.emoji.name) && user.id === author.id;
    }
  }

  const collectorOptions = {
    max: 1,
    time: (options.timeLimit * 1000),
    errors: ['time']
  }

  message.awaitReactions(filter, collectorOptions)
    .then(async (collected) => {
      const reaction = collected.first();
      const minPage = 0;
      const maxPage = (options.pages.length - 1);


      if (reaction.emoji.name === options.emojis.firstPage) {
        // head back to the first page
        if (page === minPage) return restartLoop();

        page = minPage;
        message = await message.edit(options.pages[minPage]);
        return restartLoop();
      }

      if (reaction.emoji.name === options.emojis.previousPage) {
        // move to the previous page
        if (page === minPage) return restartLoop();

        page--;
        message = await message.edit(options.pages[page]);
        return restartLoop();
      }

      if (reaction.emoji.name === options.emojis.stop) {
        // stop listening
        return true;
      }

      if (reaction.emoji.name === options.emojis.delete) {
        // delete the message (also stops listening)
        await message.react('🗑')
        await message.delete();
        const helpd = new Discord.MessageEmbed()
        helpd.setThumbnail('https://i.imgur.com/JmFQNiz.gif')
        helpd.setColor(0x2f3136)
        helpd.setTitle('\`Help command deleted!\`')
        helpd.setDescription('This message gets deleted after 10 seconds')
        await message.channel.send(helpd).then(message => message.delete({ timeout: 10000 }))
        return true;
      }

      if (reaction.emoji.name === options.emojis.nextPage) {
        // move to the next page
        if (page === maxPage) return restartLoop();

        page++;
        message = await message.edit(options.pages[page]);
        return restartLoop();
      }

      if (reaction.emoji.name === options.emojis.lastPage) {
        // head forward to the last page
        page = maxPage;
        message = await message.edit(options.pages[maxPage]);
        return restartLoop();
      }

    }).catch(async (error) => {
      if (retries >= options.maximumRetries) {
        return true;
      } else {
        retries++;
        return restartLoop();
      }
    });
}
module.exports = {
  name: 'help',
  category: 'info',
  description: 'get a list of all the commands or get details of a specific command',
  aliases: [],
  usage: '.help [a specific command]',
  //work on the help command
  run: async (client, message, args) => {
    let prefix = db.get(`PREFIX_${message.guild.id}`)
    	if (prefix === null) PREFIX = '.';
	else if (prefix !== null) PREFIX = prefix;
    try {
      if (!args[0]) {
        const emojis = {
          firstPage: '⏮',
          previousPage: '◀',
          delete: '🗑',
          nextPage: '▶',
          lastPage: '⏭'
        }

        const pages = [
          {
            embed: {
              color: 0xf94343,
              title: `Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`${PREFIX}help [command]\` to get more information about a specific command.`,
              fields: [
                {
                  name: 'CATEGORIES!',
                  value: `✨ | GUILD\n🤖 | INFO\n🔥 | MISC\n⚙ | MODERATION`
                },
              ],
	            image: {
		              url: 'https://cdn.discordapp.com/attachments/799673230646444044/845765025662500924/standard_3.gif',
	            },
            }
          },
          {
            embed: {
              color: 0xf94343,
              title: `Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`${PREFIX}help [command]\` to get more information about a specific command.`,
              fields: [
                {
                  name: '✨ | GUILD',
                  value: `\`${PREFIX}config\`\n\`${PREFIX}delete-mod-logs\`\n\`${PREFIX}delete-mute-role\`\n\`${PREFIX}member-count\`\n\`${PREFIX}mod-logs <channel>\`\n\`${PREFIX}role-info <role>\`\n\`${PREFIX}slowmode <time> [reason]\`\n\`${PREFIX}steal-emoji <emoji-1> [emoji-2] [em..]\`\n\`${PREFIX}userinfo [user]\`\n\`${PREFIX}extra-logs <channel>\`\n\`${PREFIX}delete-extra-logs\`\n\`${PREFIX}set-prefix\`\n\`${PREFIX}reset-prefix\`\n\`${PREFIX}delete-welcome-channel\`\n\`${PREFIX}setwelcome <channel>\`\n\`${PREFIX}poll <text>\`\n`
                }
              ]
            }
          },
          {
            embed: {
              color: 0xf94343,
              title: `Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`${PREFIX}help [command]\` to get more information about a specific command.`,
              fields: [
                {
                  name: '🤖 | INFO',
                  value: `\`${PREFIX}ping\`\n\`${PREFIX}help [command]\`\n\`${PREFIX}uptime\`\n\`${PREFIX}info\`\n\`${PREFIX}serverinfo\`\n\`${PREFIX}covid\`\n\`${PREFIX}invite\`\n`
                }
              ]
            }
          },
          {
            embed: {
              color: 0xf94343,
              title: `Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`${PREFIX}help [command]\` to get more information about a specific command.`,
              fields: [
                {
                  name: '🔥 | MISC',
                  value: `\`${PREFIX}afk [reason]\`\n\`${PREFIX}editsnipe\`\n\`${PREFIX}snipe\`\n`
                }
              ]
            }
          },
          {
            embed: {
              color: 0xf94343,
              title: `Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`${PREFIX}help [command]\` to get more information about a specific command.`,
              fields: [
                {
                  name: '⚙ | MODERATION',
                  value: `\`${PREFIX}addrole <user> <role>\`\n\`${PREFIX}ban <user> [reason]\`\n\`${PREFIX}fetchbans\`\n\`${PREFIX}lock [channel]\`\n\`${PREFIX}mute-role <role>\`\n\`${PREFIX}mute <user> [reason]\`\n\`${PREFIX}removerole <user> <role>\`\n\`${PREFIX}removewarn <user>\`\n\`${PREFIX}roleinfo <role>\`\n\`${PREFIX}soft-ban <user> <number of days for ban> [reason]\`\n\`${PREFIX}temp-mute <user> <time> [reason]\`\n\`${PREFIX}unban <user ID>\`\n\`${PREFIX}unlock [channel]\`\n\`${PREFIX}unmute <user>\`\n\`${PREFIX}warn <user> <reason>\`\n\`${PREFIX}warns <user>\`\n`
                }
              ]
            }
          },
          {
            embed: {
              color: 0xf94343,
              title: 'This is the end of the help menu. You can go back to the first page, by clicking the \'⏮️\' reaction.'
            }
          }
        ]

        const defaultPage = 0;

        const timeLimit = 150000;

        const maximumRetries = 3;

        const allowOtherUserReactions = false;
        let currentPage = 0;
        let currentRetries = 0;

        const msg = await message.channel.send(pages[defaultPage]);

        await msg.react(emojis.firstPage);
        await msg.react(emojis.previousPage);
        await msg.react(emojis.delete);
        await msg.react(emojis.nextPage);
        await msg.react(emojis.lastPage);

        const options = {
          emojis,
          pages,
          timeLimit,
          maximumRetries,
          allowOtherUserReactions
        }
        await reactionPages(msg, message.author, options, currentPage, currentRetries);
      } else {
        return getCMD(client, message, args[0]);
      }


      function getCMD(client, message, input) {
        const embed = new Discord.MessageEmbed()

        const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

        let info = `No information found for command **${input.toLowerCase()}**`;

        if (!cmd) {
          return message.channel.send(embed.setColor("RED").setDescription(info).setFooter('This means that the command you entered was either not found\nor there was mistakes while writing the command\'s name, you can recheck your spelling')).then(message => message.delete({ timeout: 10000 }));
        }
        if (cmd.category) info += `**Category**: ${cmd.category}`;
        if (cmd.name) info = `**Command name**: ${cmd.name}`;
        if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
        if (cmd.timeout) info += `\n**Cooldown**: ${cmd.timeout}s`
        if (cmd.description) info += `\n**Description**: ${cmd.description}`;
        if (cmd.usage) {
          info += `\n**Usage**: ${cmd.usage}`;
          embed.setFooter(`Syntax: <> = required, [] = optional, Note : If no aliases are provided, then that command has no aliases, i.e. no shortcut.`);
        }

        return message.channel.send(embed.setColor(0x2f3136).setDescription(info));
      }
    } catch (err) {
      return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
    }
  }
}
