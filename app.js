// Extracting the right classes from discord.js and env
const Discord = require('discord.js');
require('dotenv').config();

// Creating an instance of a new Discord client
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const commandPing = ['ping', 'p', 'pin']
const commandCommands = ['commands', 'command', 'com', 'c']
const commandInfo = ['info', 'help', '?']
const commandWhoDiesNext = ['whodiesnext', 'wdn', 'whodies']
const commandSanity = ['sanity', 'san', 's']
const commandAskCthulhu = ['askcthulhu', 'askc', 'ac']

client.on('message', (msg) => {
    // Prevent the bot from responding to itself
    if (msg.author == client.user) { return }

    // Check if a command is being posted
    if (msg.content.startsWith(`!`))
        processCommand(msg)
})

function processCommand(msg) {
    // Splitting up the command and its arguments
    let fullCommand = msg.content.substr(1)
    let splitCommand = fullCommand.split(' ')
    let command = splitCommand[0]
    let args = splitCommand.slice(1)

    // Logging the given commands and its arguments
    console.log('Command received: ' + command)
    console.log('Arguments: ' + args)

    if (commandPing.includes(command))
        msg.channel.send(':ping_pong: Pong!')
    if (commandCommands.includes(command))
        msg.channel.send('```!info\n!commands\n!ping\n!whodiesnext\n!sanity\n!askcthulhu [question]```')
    if (commandInfo.includes(command))
        msg.channel.send('I am a bot created by <@177545650966233090>. Although he is my creator, there is only one true Great Old One I serve. :octopus:')   
    if (commandWhoDiesNext.includes(command))
        msg.channel.send(`He told me the next one to die is going to be **` + whoDiesNext() + `**..`);
    if (commandSanity.includes(command))
        msg.channel.send(`Ah, this one is fun.. I will ask him..\nThe next person to go **` + sanity() + `** insane is going to be **` + whoDiesNext() + `**..`)
    if (commandAskCthulhu.includes(command))
        msg.channel.send(askCthulhu(args))
}

function whoDiesNext() {
    let characters = ['Lorenz Braun', 'Rado McCain', 'Alberto Heijns', 'Zoubbi Loubbi'];
    let deadCharacter = characters[Math.floor(Math.random() * characters.length)];
    return deadCharacter;
}

function sanity() {
    let typesOfInsanity = ['temporarily', 'indefinitely', 'permenantly'];
    let insanity = typesOfInsanity[Math.floor(Math.random() * typesOfInsanity.length)];
    return insanity;
}

function askCthulhu(question) {
    if (question < 1) return 'There is no question to answer.'
    let cthulhuAnswers = [
        'It is certain because cthulhu says so.',
        'Cthulhu says: Without a doubt.',
        'Cthulhu thinks: Most likely.',
        'Yes. He whispers..',
        `I don't think cthulhu knows this right now.. why don't you ask **` + whoDiesNext() + `**?`,
        `The **Keeper** definitely knows the answer to this.`,
        'I cannot hear him right now..',
        'His whispers say no.',
        'Very doubtful he says.',
        'He screams NO!',
        `No, no, no definitely not! I don't even have to ask him to know that!`,
    ]
    let answer = cthulhuAnswers[Math.floor(Math.random() * cthulhuAnswers.length)]
    return answer;
}
