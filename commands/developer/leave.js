const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'leave',
    category: 'developer',
    description: 'no no go away',
    aliases: [],
    usage: '.leave [id]',
    run: async(client, message, args)=>{
    try{

            if(message.author.id === "671355502399193128" || message.author.id === "321750582912221184") {

      const guildId = args[0];
  
      if (!guildId) {
        return message.channel.send("Please provide an id");
      }
  
      const guild = client.guilds.cache.find((g) => g.id === guildId);
  
      if (!guild) {
        return message.channel.send("That guild wasn't found");
      }
  
      try {
        await guild.leave();
        message.channel.send(`Successfully left guild: **${guild.name}**`);
      } catch (e) {
        console.error(e);
        return message.channel.send("An error occurred leaving that guild");
      }    

            }

     }catch(err) {
        console.log(err)
        return message.channel.send(`Error: ${err.message}`)
      }
   }
}