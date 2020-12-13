const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('wio.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "yeniden bağlandım kral");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on('userUpdate', async (oldUser, newUser) => {
  if(oldUser.avatarURL({dynamic:true}) !== newUser.avatarURL({dynamic:true})) {
 client.guilds.cache.forEach(async guild => {

    const channeldata = await db.fetch(`gifpp.${guild.id}`)
    if(!channeldata) return;
    let channel = await guild.channels.cache.get(channeldata)
    
    const embed = new Discord.MessageEmbed().setColor('BLACK').setAuthor(newUser.tag).setImage(newUser.avatarURL({dynamic:true}))
return channel.send(embed)
     
    })   
  }
  });


const webhook = new Discord.WebhookClient(
  "785927743777800193",
  "1B4H1AY6u29EJwYWhUiSERv8jwiAa9i0Av6425W_DhNK9js7WkVa6fSB5JgI8uuNj8om"
);

client.on("guildCreate", async guild => {
  const embed = new Discord.MessageEmbed()
   
    .setTimestamp()
    .setColor("GREEN")
    .setTitle(`<a:keeragiris:758974244637245481> Yükselmeye Devam!`)
    .setFooter(`${client.guilds.size} sunucuya ve ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya Hizmet!`
    )
    .addField(
      "Sunucu Bilgileri",
      `Sunucu İsmi: **${guild.name}**\nSunucu ID: **${guild.id}**\nSunucu Sahibi: **${guild.owner}**\n**Sunucudaki Uye Sayısı: **${guild.memberCount}**`
    );
  webhook.send(embed);
});
client.on("guildDelete", async guild => {
  const embed = new Discord.MessageEmbed()
   
    .setTimestamp()
    .setColor("RED")
    .setTitle(`<a:keeracikis:758974243827351563> Düşüşteyiz...`)
    .setFooter(`${client.guilds.size} sunucuya ve ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya Hizmet!`
    )
    .addField(
      "Sunucu Bilgileri",
      `Sunucu İsmi: **${guild.name}**\nSunucu ID: **${guild.id}**\nSunucu Sahibi: **${guild.owner}**\n**Sunucudaki Uye Sayısı: **${guild.memberCount}**`
    );
  webhook.send(embed);
});


