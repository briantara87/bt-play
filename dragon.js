const Commando = require("discord.js-commando");
const request = require("request");

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  request("http://edgedragons.net/random", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let emb = new Discord.RichEmbed()
        .setImage(body)
        .setColor("#95C0FF")
        .setTitle("Here is your random dragon");

      message.channel.send(emb);
      message.delete();
    }
  });
};

module.exports.help = {
  name: "dragon"
};
