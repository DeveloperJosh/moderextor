const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
  name: 'giveaway',
  category: 'guild',
  description: 'Use this to give the goods away',
  aliases: ['gw'],
  usage: '.giveaway [time] [prize]',
  run: async (client, message, args, member) => {
    try {
      let member = message.guild.members;
      if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`ADMINISTRATOR\` permission, to use this command.");
      if (!message.member.guild.me.hasPermission(['ADMINISTRATOR'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`ADMINISTRATOR\` permission to use this command")

      const time = args[0]
      if (args[0] && ms(args[0]) === undefined) {
        const error1 = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like that is not a valid time`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide me with a time and item.\n\nExample :
                \`\`\`fix
.giveaway [time] [prize]\`\`\``)
        message.channel.send(error1)
        return;
      }
      let item = args.slice(1).join(' ')
      if (!item || !time) {
        const error = new Discord.MessageEmbed()
          .setTitle(`🔴 Looks like there is an Issue!`)
          .setColor(0x2f3136)
          .setDescription(`You have to at least mention or provide me with a time and item.\n\nExample :
                \`\`\`fix
.giveaway [time] [prize]\`\`\``)
        message.channel.send(error)
        return;
      }
    
            const embed = new Discord.MessageEmbed();
            embed.setColor(0x3333ff);
            embed.setTitle("New Giveaway!");
            embed.addField(`**Prize:**`, `**${item}**`, true);
            embed.addField('**Hosted By:**', `<@${message.author.id}>`, true)
            embed.addField(`**Duration:** `, ms(ms(time), {
              long: true
            }), true);
            embed.setFooter("React to this message with 🎉 to participate!, Note the bot will remove it\'s reaction in 10s");
            let embedSent = await message.channel.send(embed);
            embedSent.react("🎉");

                setTimeout(async () => {

                embedSent.reactions.cache.get('🎉').users.remove(client.user.id)

                }, 10000);

                setTimeout(async () => {
                  var winner = embedSent.reactions.cache.get('🎉').users.cache.random();

                  if (!embedSent.reactions.cache.get('🎉').users.cache.size < 1) {

                    message.channel.send(`🎉 **${winner}** has won the giveaway **${item}**! Congratulations ! 🎉`);

                  }

                  if (!embedSent.reactions.cache.get('🎉').users.cache.size < 0) {
                    return message.channel.send(`Not enough participants to execute the draw of the giveaway **${item}** :(`);
                  }
                  if (!embedSent.reactions.cache.get('🎉').users.cache.size < 1) {
                    const winner_embed = new Discord.MessageEmbed()
                      .setColor(0x3333ff)
                      .setTitle("Giveaway Ended")
                      .addField(`**Prize:**`, `**${item}**`, true)
                      .addField('**Hosted By:**', `<@${message.author.id}>`, true)
                      .addField(`**Winner**:`, `${winner}`, true)
                    embedSent.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
                  }
                }, ms(time));

    } catch (err) {
      console.log(err)
      return message.channel.send(`Error: ${err.message}`)
    }
  }
}