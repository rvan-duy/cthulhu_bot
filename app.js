// Extracting the right classes from discord.js and env
const Discord = require('discord.js');
require('dotenv').config();

// Creating an instance of a new Discord client
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const characters = [
    'Lorenz Braun',
    'Zoubbi',
    'Alberto Heijns',
    'Rado McCain',
];

const typesOfInsanity = [
    'temporarily',
    'indefinitely',
    'permenantly',
]

client.on('message', (msg) => {
    if (msg.content === '!ping')
        msg.channel.send(':ping_pong: Pong!')
    if (msg.content === '!commands')
        msg.channel.send('```!info\n!commands\n!ping\n!whodiesnext\n!sanity```')
    if (msg.content === '!info')
        msg.channel.send('I am a bot created by <@177545650966233090>. Although he is my creator, there is only one true Great Old One I serve. :octopus:')
    if (msg.content === '!whodiesnext')
        msg.channel.send(`He told me the next one to die is going to be **` + characters[Math.floor(Math.random() * characters.length)] + `**..`)
    if (msg.content === '!sanity')
        msg.channel.send(`Ah, this one is fun.. I will ask him..\nThe next person to go **` + typesOfInsanity[Math.floor(Math.random() * typesOfInsanity.length)] + `** insane is going to be **` + characters[Math.floor(Math.random() * characters.length)] + `**..`)
});