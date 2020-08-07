//This command will be required package discord.js
const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

exports.run = async (client, message, args) => {
  // Modification
  let crafty = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!crafty[message.guild.id]) {
    crafty[message.guild.id] = {
      prefix: config.prefix
    };
  }

  //if (!args[0]) {
  //gw solat dulu//ya. udah selese nig.//ndk bisa
  //dah//thx
  let embed1 = new RichEmbed();
  let embed = new RichEmbed()
    .setAuthor(
      `BLETIK | BT`,
      `https://cdn.discordapp.com/avatars/478547279104442368/8d7f341ebda4498869591fbd95e3d807.png?size=256

`
    )
    .setColor(`#00B0FF`)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "If you have a question / bug report please report them on",
      "[Discord](https://discord.gg/quhBQyf)\n_ _",
      `false`
    )
    .addField(
      "my youtube channel",
      "[YouTube](https://www.youtube.com/channel/UCwNb6v-oD_EU4xFpeiVQ8Cg)\n_ _",
      "false"
    )
    .addField(
      `Are you don't know how to use this bot? do :`,
      `${crafty[message.guild.id].prefix}commands`,
      `false`
    ) //Kenapa? ~andra//pen biar prefix per server nya muncul///oh wait
    .setFooter(
      "©Release 2020 | BLETIK Bot | This bot is still under Development"
    )
    .setTimestamp();
  message.channel.send(embed);
  message.delete();
};
exports.conf = {
  //Auto fokus anjir. uwau. anying speaker w rusak.z
  aliases: ["h"]
};

exports.help = {
  name: "Help"
};
