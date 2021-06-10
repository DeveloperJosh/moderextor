const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'blacklist',
    category: 'developer',
    description: 'This is dev only',
    aliases: [],
    usage: '.blacklist <id>',
    run: async(client, message, args)=>{
    try{

      if(message.author.id === "671355502399193128" || message.author.id === "321750582912221184") {

      const mentionedddMember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      const member = message.guild.member(mentionedddMember);

            if (!member) {
        const error = new Discord.MessageEmbed()
       .setTitle(`🔴 Looks like there is an Issue!`)
       .setColor(0x2f3136)
       .setDescription(`You have to provide a id or mention.\n\nExample :
                \`\`\`fix
.blacklist <mention a user>
OR
.blacklist <provide the user\'s ID>\`\`\``)
          return message.channel.send(error);
      }

   db.add(`blacklisted_${member.id}`, 1)

  const bl = new Discord.MessageEmbed()
  .setTitle('Blacklisted')
  .setDescription(`${member} was blacklisted`)

message.channel.send(bl)
return;
      }

      const blacklist = new Discord.MessageEmbed()
      .setTitle('Nope:x:')
      .setDescription('You are not a developer')

      message.channel.send(blacklist)

     }catch(err) {
        console.log(err)
        return message.channel.send(`Error: ${err.message}`)
      }
   }
}