const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.discord.token);



const Discord = require('discord.js')
const bot = new Discord.Client()
const ytdl = require("ytdl-core");
const TOKEN = 'Nzk3MTE0Mzc0OTEyMzQ0MDg0.X_hwnA.RMdUDdycDOX7uEPITZasoKEEdDA'
const prefix = '*'
const version = '1.0 beta';
var servers = {};

const actvs = [
    "Node.js",
    "Landi",
    "Visual Studio Code",
    "Coden",
    "Author:🍁Ganjamann🍁#9631",
    "V1.0(beta)",

]



bot.on('ready', () => {
    bot.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    setInterval(() => {
        bot.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    }, 3000);
});

bot.on('message', message => {
    let parts = message.content.split(" ");

    if(parts[0] == '*help') {
        message.channel.send('**Hier meine Befehle**\n**/*clear**/**/*purge** - Löscht bis zu 100 Nachrichten\n**/*member** - Sagt dir, wieviele Mitglieder der Server hat, auf dem du dich befindest.\n**/*owner** - Sagt dir, wer der die Eigentumsrechte von einem Server hat.\n**/*info <@>** - Damit kannst du dir die Benutzerinfo von dir oder jmd anderes anzeigen lassen')
    }
    else if(parts[0] == '*clear' || parts[0] == '*purge') {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Zugriff verweigert!')
        if(!parts[1]) return message.channel.send('wie viele nachrichten möchtest du löschen!')
        if(isNaN(parts[1])) return message.channel.send('Diese eingabe ist ungültig!')
        if(parts[1] > 100) return message.channel.send('Du kannst nicht mehr als 100 Nachrichten löschen!')
        if(parts[1] < 2) return message.channel.send('Du musst mindestens 2 nachrichten löschen')
        message.channel.bulkDelete(parts[1])
        message.channel.send(`Ich habe erfolgreich **${parts[1]}** Nachrichten gelöscht!`).then(m => m.delete({timeout: 3000}))
    }  
    else if(parts[0] == '*member') {
        message.channel.send(`Der **${message.guild.name}**-Server hat gerade **${message.guild.members.cache.filter(m => m.user.bot).size}** Mitglieder!`)
    }
    else if(parts[0] == '*owner') {
        message.channel.send(`Der Owner vom **${message.guild.name}**-Server ist **${message.guild.owner.user.tag}**`)
    }

    
    else if (parts[0] == '*ips') {
        message.channel.send('Die ts ip:coming soon *** discord link: https://discord.gg/vuPtBmD4Qz')
        
    }   
        else if(parts[0] == '*info') {
        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user

        const embed = new Discord.MessageEmbed()
        .setColor('69e3e2')
        .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
        .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${usr}'s Informationen`)
        .addField('**Name + ID:**', `${usr.tag}`)
        .addField('**ID:**', `${usr.id}`)
        .addField('**Avatar URL:**', `${usr.displayAvatarURL({dynamic: true})}`)
        .addField('**Nickname (Wenn vorhanden):**', `${member.nickname || `Der Benutzer hat keinen Nickname`}`)
        .addField('**Dem Server gejoined:**', `${member.joinedAt}`)
        .addField('**Discord gejoined**', `${usr.createdAt}`)
        .addField('**Status:**', `${userr.presence.status}`)
        .addField('**Bot:**', `${usr.bot}`)
        .addField('**♬♬♬♬♬♬♬♬**', `${usr.tag}/*******ID:${usr.id}`)
        .addFields({
            name: '**Rollenmenge:**',
            value: member.roles.cache.size - 1,
        })

        message.channel.send(embed)

        client.on('ready', () => {
            console.log('I am ready!');
          });
          
        }     
    else if(message.content.includes('<797114374912344084>')) {
        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('**Was gibts?**')
        .addField('Brauchst du Hilfe?', 'Benutze t!help')
        .addField('Willst du dem Owner eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
        .addField('Brauchst du bei sonst etwas Hilfe?', 'Wende dich an den Owner oder das Team')
        .addField('Author:','**🍁Ganjamann🍁#9631**')

        message.channel.send(embed)
    }
    
    else if(message.content.includes('<@!797114374912344084>')) {
        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('**Was gibts?**')
        .addField('Brauchst du Hilfe?', 'Benutze t!help')
        .addField('Willst du dem Owner eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
        .addField('Brauchst du bei sonst etwas Hilfe?', 'Wende dich an den Owner oder das Team')

        message.channel.send(embed)
    }

    else if(parts[0] == '*ping') {
        message.channel.send('Ping wird berechnet...').then(resultMessage => {
            let ping = resultMessage.createdTimestamp - message.createdTimestamp;
            
            resultMessage.edit(`**Ping**\nBot Latenz: **${ping}**ms\nAPI Latenz: **${bot.ws.ping}**ms`);
        })
    }
})

bot.on('message', message => {
    if(message.content === "*trak"){
        var user = message.author;
        var guild = message.guild
        var usr = message.mentions.users.first() || message.author
        var member = guild.members.cache.get(usr.id)
    
            const userr = member.user
        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                     message.reply(`Du hast ${userInviteCount} Einladungen.`);
            }
        )
    }
});



bot.login(TOKEN)