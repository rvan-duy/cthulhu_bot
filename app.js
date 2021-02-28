// Extracting the right classes from discord.js and env
const Discord = require("discord.js");
require("dotenv").config();

// Creating an instance of a new Discord client
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// The commands and their aliases
const commandPing = ["ping", "p", "pin"];
const commandCommands = ["commands", "command", "com", "c"];
const commandInfo = ["info", "help", "?"];
const commandWhoDiesNext = ["whodiesnext", "wdn", "whodies"];
const commandSanity = ["sanity", "san", "s"];
const commandAskCthulhu = ["askcthulhu", "askc", "ac"];
const commandRoll = ["roll", "rolldice", "r", "rd"];

client.on("message", (msg) => {
    // Prevent the bot from responding to itself
    if (msg.author == client.user) { return }

    // Check if a command is being posted
    if (msg.content.startsWith("!"))
        processCommand(msg)
});

function processCommand(msg) {
    // Splitting up the command and its arguments
    let fullCommand = msg.content.substr(1)
    let splitCommand = fullCommand.split(' ')
    let command = splitCommand[0].toLowerCase();
    let args = splitCommand.slice(1)

    // Logging the given commands and its arguments
    console.log('Command received: ' + command)
    console.log('Arguments: ' + args)

    if (commandPing.includes(command))
        msg.channel.send(':ping_pong: Pong!')
    if (commandCommands.includes(command))
        msg.channel.send('```!info\n!commands\n!ping\n!avatar [username]\n!whodiesnext\n!sanity\n!askcthulhu [question]\n!roll [amount of dice]d[amount of dice-sides]```')
    if (commandInfo.includes(command))
        sendInfo(msg);
    if (commandWhoDiesNext.includes(command))
        msg.channel.send(`He told me the next one to die is going to be **` + whoDiesNext() + `**..`);
    if (commandSanity.includes(command))
        msg.channel.send(`Ah, this one is fun.. I will ask him..\nThe next person to go **` + sanity() + `** insane is going to be **` + whoDiesNext() + `**..`)
    if (commandAskCthulhu.includes(command))
        askCthulhu(msg, args);
    if (commandRoll.includes(command))
        rollDice(msg, args);
};

function sendInfo(msg) {
    msg.channel.send("I am a bot created by <@177545650966233090>. Although he is my creator, there is only one true Great Old One I serve. :octopus:\nMy source code can be found on: <https://github.com/rvan-duy/cthulhu_bot>");
    msg.channel.send("https://thumbs.gfycat.com/SlimClutteredLeafhopper-size_restricted.gif");
};

function whoDiesNext() {
    let characters = ['Lorenz Braun', 'Rado McCain', 'Alberto Heijns', 'Zoubbi Loubbi'];
    let deadCharacter = characters[Math.floor(Math.random() * characters.length)];
    return deadCharacter;
};

function sanity() {
    let typesOfInsanity = ['temporarily', 'indefinitely', 'permenantly'];
    let insanity = typesOfInsanity[Math.floor(Math.random() * typesOfInsanity.length)];
    return insanity;
};

function askCthulhu(msg, args) {
    if (!args[0]) 
        msg.channel.send("There is no question to answer.");
    else {
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
        ];
        let answer = cthulhuAnswers[Math.floor(Math.random() * cthulhuAnswers.length)];
        msg.channel.send(answer);
    }
};

function rollDice(msg, args)
{
    // If there are no args - default 1d20
    if (!args[0])
        args[0] = "1d20";

    // If there is no "d" in args, we cannot roll
    if (!args[0].includes('d')) {
        msg.channel.send(`Please make sure there is a 'd' character in your command.`)
        return;
    }

    // Splitting args inbetween what comes before the "d" and after
    let numbers = args[0].split('d')
    if (numbers[0] > 400 || numbers[1] > 400) {
        msg.channel.send('I can only roll up to 400 dice/sides at the same time.')
        return;
    }
    
    let rollResults = [];
    if (!numbers[1]) {msg.channel.send('Please specify the amount if sides the dice should have.'); return;}
    if (numbers[1] < 1 || isNaN(numbers[1])) {msg.channel.send('That is not a valid dice side.'); return;}
    if (numbers[0] > 1)
        msg.channel.send('Rolling a total of ' + numbers[0] + ' dice, with ' + numbers[1] + ' sides:')
    else {
        msg.channel.send('Rolling 1 dice, with ' + numbers[1] + ' sides:')
        numbers[0] = '1'
    }
    if (numbers[0] > 0) {
        for (let i = 0; i < numbers[0]; i++) {
            rollResults.push(' ' + Math.floor(Math.random() * numbers[1] + 1))
        }
        msg.channel.send(rollResults.toString())
    }
};