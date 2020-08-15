const Discord = require('discord.js');
const config = require("../config.json")

module.exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Restart")
    .setDescription("u bukan developer :)")
    .setColor(`#ecd4fc`);
    if(message.author.id !== '478547279104442368') return message.channel.send(embed);
    message.channel.send(`>>> Restarted in ${Math.floor(client.ping / 100)}ms`).then(() => {
        process.exit(1);
    })
}

exports.conf ={
  aliases: ['r']
}
exports.help ={
  name: 'restart'
}