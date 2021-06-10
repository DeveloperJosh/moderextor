const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'avatar',
    category: 'info',
    timeout: 10000,
    description: 'Get the Avatar of an user',
    aliases: ['av'],
    usage: '.av [mention someone or use their ID]',
    run: async(client, message, args)=>{
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            const statuser = member.user.presence.status;
            var guildID = client.guilds.cache.get(message.guild.id).id;
            let em = new MessageEmbed()
            em.setImage(client.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 }))
            em.setColor(0x2f3136)
            if(statuser === 'offline'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:offline:817482344918679612> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${client.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'online'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:Online:817482345539174400>[Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${client.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'idle'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:idle:817482346101211176> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${client.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'dnd'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:DnD:817482344351924224> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${client.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            em.setTimestamp(new Date())
            em.setFooter(client.user.username, client.user.avatarURL())
            message.channel.send(em);
        }catch(err){
            console.log(err)
            if(err) return message.channel.send('I was unable to find that member :(');
        }
    }
}
