const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'covid',
  category: 'info',
  description: 'gwet info on covid019',
  timeout: 10000,
  aliases: [],
  usage: `.covid`,
  run: async (client, message, args) => {
    try {

    let countryName = (args[0])

          if (!countryName) {
            fetch('https://corona.lmao.ninja/v3/covid-19/all')
              .then(res => res.json())
              .then(d => {
                let cases = d.cases.toLocaleString();
                let recov = d.recovered.toLocaleString();
                let deaths = d.deaths.toLocaleString();
                const coronEmbed = new MessageEmbed()
                  .setAuthor('Worldwide Corona Statistics', 'https://miro.medium.com/max/3840/1*GDek9NTp5Ag77-4uCiivIQ.png')
                  .setColor('BLUE')
                  .addFields(
                    { name: "Cases", value: cases, inline: true },
                    { name: "Recovered", value: recov, inline: true },
                    { name: "Deaths", value: deaths, inline: true }

                  )
                  .setFooter('Stay Safe!')
                message.channel.send(coronEmbed)
              });
          } else if (countryName) {

            fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${countryName}`)
              .then(res => res.json())
              .then(d => {
                let name = d.country
                let flag = d.countryInfo.flag;
                let cases1 = d.cases.toLocaleString();
                let recov1 = d.recovered.toLocaleString();
                let deaths1 = d.deaths.toLocaleString();
                const coronEmbed1 = new MessageEmbed()
                  .setAuthor(`${name} Corona Statistics`, 'https://miro.medium.com/max/3840/1*GDek9NTp5Ag77-4uCiivIQ.png')
                  .setThumbnail(flag)
                  .setColor('BLUE')
                  .addFields(
                    { name: "Cases", value: cases1, inline: true },
                    { name: "Recovered", value: recov1, inline: true },
                    { name: "Deaths", value: deaths1, inline: true }

                  )
                  .setFooter('Stay Safe!')
                message.channel.send(coronEmbed1)
              })
          }

    } catch (err) {
      return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
    }
  },
};
