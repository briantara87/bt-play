const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://bletikbt.glitch.me/`);
const { prefix } = require("./config.json");
  })

const discord = require("discord.js");

const client = new discord.Client({disableMentions:"everyone"})

const db = new Map()

const fs = require("fs")

const snek = require("node-superfetch")

const { prefix } = require("./config.json")

client.aliases = new discord.Collection();

client.commands = new discord.Collection();

client.prefix = prefix

client.queue = new Map()

client.hastebin = async(text) => {

  const { body } = await snek.post("https://bin-clientdev.glitch.me/documents")

  .send(text);

  return `https://bin-clientdev.glitch.me/${body.key}`

}

//event

client.on('ready', () => {

  console.log(`${client.user.tag} ready to serving ${client.guilds.cache.size} guild(s) and ${client.users.cache.size} user(s), with ${client.commands.size} command(s) total!`)

  client.user.setActivity("Some Music", {type:"LISTENING"})

});

const commandFile = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

commandFile.forEach(file => {

  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command);

  command.alias.forEach(alias => {

  client.aliases.set(alias, command);

  })

  console.log(`Loaded command ${command.name} with alias(es) => ${command.alias}`)

  })

client.on('message', msg => {

  if(msg.author.bot) return;

  if(!msg.guild) return;

  

  if(msg.content == `<@${client.user.id}>`){

    const embed = new discord.MessageEmbed()

    .setDescription(`:wave: | My prefix is ${prefix}`)

    .setColor("RANDOM")

    .setFooter("© Client Developer 2020")

    msg.channel.send(embed)

  }

  if(msg.content == prefix) {

    const embed = new discord.MessageEmbed()

    .setDescription(`Hey, It's me!

You can type ${prefix}help to get bot commands list`)

    .setColor("RANDOM")

    .setFooter("© Client Developer 2020")

    return msg.channel.send(embed)

  }

  let args = msg.content.slice(prefix.length).trim().split(" ");

  let cmd = args.shift().toLowerCase();

  if(!msg.content.startsWith(prefix)) return;

  

  try {

    const file = client.commands.get(cmd) || client.aliases.get(cmd)

    if(!file) return msg.reply("exist")

    

    const now = Date.now()

   if (db.has(`cooldown_${msg.author.id}`)) {

	const expirationTime = db.get(`cooldown_${msg.author.id}`) + 3000;	if (now < expirationTime) {

		const timeLeft = (expirationTime - now) / 1000;

		return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${file.name}\` command.`);

	}

}

  db.set(`cooldown_${msg.author.id}`, now);

  setTimeout(() => {

    db.delete(`cooldown_${msg.author.id}`)

  },3000)

    

    file.run(client, msg, args)

  } catch (err) {

    console.error(err)

  } finally {

    console.log(`${msg.author.tag} using ${cmd} in ${msg.channel.name} | ${msg.guild.name}`)

  }

}) 

//insert token at .env first

client.login(process.env.TOKEN)