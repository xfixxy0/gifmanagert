const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('wio.db');
const talkedRecently = new Set();
let botid = ('709489466913325168') 

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "v!";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**GIF MANAGER YARDIM Menüsüne Hoşgeldiniz**`)
        .setDescription(`
		**g!istatistik** **Botun Kullanıcı Sayısı v.b bilgilerini gösterir**
		**g!ping** **Botun Pingini Gösterir**
		**g!davet** **Botu Sunucunuza Davet etme linkini atar**
        **g!gif-ara**  Yazdığınız Kelime Hakkında Gif Aratır!
        **g!man-gif** Rastgele Erkek Gifi Atar!
        **g!woman-gif** Rastgele Kadın Gifi Atar!
        **g!couple-gif** Rastgele Sevgili Gifi Atar!
        **g!baby-gif** Rastgele Bebek Gifi Atar!
        **g!animal-gif** Rastgele Hayvan Gifi Atar!
        **g!randomgif** Rastgele 2 Tane Gifi Atar!
        **g!randompp** +500.000 Kullanıcının rastgele pp yada gif atar
        **g!marvel-gif**  Rastgele Marvel Gifi Atar!
		**g!random-gif-pp ayarla #kanal** Botun Oldugu  Kullanıcının Rastgele pp ve gif belirtilen kanala atar! 
		**g!random-gif-pp sıfırla** Botun Oldugu Kullanıcıların  Rastgele pp ve gif belirtilen kanala atmasını sıfırlar! `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};