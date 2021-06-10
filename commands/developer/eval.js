const Discord = require('discord.js');
module.exports = {
  name: 'eval',
  category: 'developer',
  description: 'eval the code',
  aliases: [],
  usage: '.eval <code>',
  run: async (client, message, args) => {
    try {
      if(message.author.id === "671355502399193128" || message.author.id === "321750582912221184") {
      const embed = new Discord.MessageEmbed()
        .setTitle("🟢 Success 🟢")
        .addField("Input", "```xl\n" + args.join(" ") + "```");

      try {
        const code = args.join(" ");
        if (!code) return;
        let evaled;
        const start = process.hrtime();
        evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 });

        let output = clean(evaled);
        if (output.length > 2048) {

          const { body } = await post("https://hastebin.com/documents").send(output);
          embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor('#2f3136');

        } else {
          embed.addField("Output", "```js\n" + output + "```").setColor('#2f3136')
        }
        const stop = process.hrtime(start);

        embed.addField("Time Taken", "```fix\n" + stop + "ms```").setColor('#2f3136')
        message.channel.send(embed);

      } catch (error) {
        let err = clean(error);
        if (err.length > 2048) {
          // Do the same like above if the error output was more than 1024 characters.
          const { body } = await post("https://hastebin.com/documents").send(err);
          embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("#2f3136");
        } else {
          embed.setTitle("🔴 Error 🔴")
          embed.addField("Output", "```js\n" + err + "```").setColor("#2f3136");
        }

        message.channel.send(embed);
      }
      function clean(string) {
        if (typeof text === "string") {
          return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
        } else {
          return string;
        }
      }
      } else {
        return;
      }
    } catch (error) {
      return message.channel.send(`Error: \`${error.message}\``)
    }
  }
}