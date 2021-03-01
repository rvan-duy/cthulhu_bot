// Extracting the right classes from discord.js and env
const Discord = require("discord.js");
require("dotenv").config();

// Creating an instance of a new Discord client
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const ytdl = require("ytdl-core");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// The commands and their aliases
const commandPing = ["ping", "p", "pin"];
const commandCommands = ["commands", "command", "com", "c"];
const commandInfo = ["info", "help", "?"];
const commandGif = ["gif", "gifs", "gi", "g"];
const commandWhoDiesNext = ["whodiesnext", "wdn", "whodies"];
const commandSanity = ["sanity", "san", "s"];
const commandAskCthulhu = ["askcthulhu", "askc", "ac"];
const commandRoll = ["roll", "rolldice", "r", "rd"];
const command1920Music = ["1920music", "1920m", "1m"];
const commandHorrorMusic = ["horrormusic", "hmusic", "hm"];
const commandStop = ["stop"];
const commandTigers = ["tiger", "tigers", "t"];

const oldMusic = [
    "https://www.youtube.com/watch?v=jtepWkaakhk",
    "https://www.youtube.com/watch?v=V_5qcSZBvYA",
    "https://www.youtube.com/watch?v=hGFOk5OoE6Y",
    "https://www.youtube.com/watch?v=1hY8f20tqlI",
    "https://www.youtube.com/watch?v=dTz4G9JTUjs",
    "https://www.youtube.com/watch?v=kRDJ5FnxZHg",
    "https://www.youtube.com/watch?v=FBn7QPQaVPo",
    "https://www.youtube.com/watch?v=Ol_ZIiUh6oU",
    "https://www.youtube.com/watch?v=gTevoUhDeoM",
    "https://www.youtube.com/watch?v=YYNEJITxi2Y&t",
    "https://www.youtube.com/watch?v=YBOoQcoPL1I",
    "https://www.youtube.com/watch?v=eGXeD41s4NM",
    "https://www.youtube.com/watch?v=9G5BuumJ5xA",
    "https://www.youtube.com/watch?v=6WzRzNGsR9Q",
];

const horrorMusic = [
    "https://www.youtube.com/watch?v=uk69Ofr8kk8",
    "https://www.youtube.com/watch?v=oxvDnaWe5XE",
    "https://www.youtube.com/watch?v=qEzWqUhnbVA",
    "https://www.youtube.com/watch?v=M-MypA7K2Xc",
    "https://www.youtube.com/watch?v=PTLTt2XGeRg",
    "https://www.youtube.com/watch?v=hf0n3T_5nTc",
    "https://www.youtube.com/watch?v=MEHOYYZJO1A",
    "https://www.youtube.com/watch?v=MfT2B5K5Xy0",
    "https://www.youtube.com/watch?v=XC3Pdi8K-Cs",
    "https://www.youtube.com/watch?v=uc-KZSPwzBI",
    "https://www.youtube.com/watch?v=WUhMLw6vq8g",
    "https://www.youtube.com/watch?v=Rk3ddLNKAQo",
];

client.on("message", (msg) => {
    // Prevent the bot from responding to itself
    if (msg.author == client.user) { return }

    // Check if a command is being posted
    if (msg.content.startsWith("!"))
        processCommand(msg)
});

function processCommand(msg) {
    // Splitting up the command and its arguments
    let fullCommand = msg.content.substr(1);
    let splitCommand = fullCommand.split(' ');
    let command = splitCommand[0].toLowerCase();
    let args = splitCommand.slice(1);

    // Logging the given commands and its arguments
    console.log('Command received: ' + command)
    console.log('Arguments: ' + args)

    if (commandPing.includes(command))
        checkPing(msg);
    if (commandCommands.includes(command))
        msg.channel.send('```!info\n!commands\n!ping\n!gif\n!whodiesnext\n!sanity\n!1920music\n!horrormusic\n!tigers\n!askcthulhu [question]\n!roll [amount of dice]d[amount of dice-sides]```')
    if (commandInfo.includes(command))
        sendInfo(msg);
    if (commandGif.includes(command))
        randomGif(msg);
    if (commandWhoDiesNext.includes(command))
        msg.channel.send(`He told me the next one to die is going to be **` + whoDiesNext() + `**..`);
    if (commandSanity.includes(command))
        msg.channel.send(`Ah, this one is fun.. I will ask him..\nThe next person to go **` + sanity() + `** insane is going to be **` + whoDiesNext() + `**..`)
    if (commandAskCthulhu.includes(command))
        askCthulhu(msg, args);
    if (commandRoll.includes(command))
        rollDice(msg, args);
    if (commandStop.includes(command))
        leaveVoice(msg);
};

client.on('message', async msg => {
    // Splitting up the command and its arguments
    let fullCommand = msg.content.substr(1);
    let splitCommand = fullCommand.split(' ');
    let command = splitCommand[0].toLowerCase();
    let args = splitCommand.slice(1);

    // Voice only works in guilds, if the message does not come from a guild, we ignore it
    if (!msg.guild) return;
    if (command1920Music.includes(command)) {
        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            msg.channel.send(`Starting a party in **${msg.member.voice.channel}**\nLets swing baby! :musical_note:`);
            const dispatcher = connection.play(ytdl(oldMusic[Math.floor(Math.random() * oldMusic.length)], { filter: "audioonly"}));
            dispatcher.on("finish", () => {
                console.log("Finished playing 1920Music, disconnecting..");
                dispatcher.destroy();
                msg.guild.me.voice.channel.leave();
            })
        } else { msg.reply('you need to be in a voice channel for me to join.'); }
    };
    if (commandTigers.includes(command)) {
        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            msg.channel.send(`:tiger: Tigers, tigers, tigers in **${msg.member.voice.channel}** are you with me? :tiger2:`);
            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=cvsA-JpFOzo", { filter: "audioonly" }));
            dispatcher.on("finish", () => {
                console.log("Finished playing Tigers, disconnecting..");
                dispatcher.destroy();
                msg.guild.me.voice.channel.leave();
          })
        } else { msg.reply('you need to be in a voice channel for me to join.'); }
    };
    if (commandHorrorMusic.includes(command)) {
        // Only try to join the sender's voice channel if they are in one themselves
          if (msg.member.voice.channel) {
              const connection = await msg.member.voice.channel.join();
              msg.channel.send(`Spooky times in **${msg.member.voice.channel}**\nAre you spooked yet? :octopus:`);
              const dispatcher = connection.play(ytdl(horrorMusic[Math.floor(Math.random() * horrorMusic.length)], { filter: "audioonly"}));
              dispatcher.on("finish", () => {
                  console.log("Finished playing horrorMusic, disconnecting..");
                  dispatcher.destroy();
                  msg.guild.me.voice.channel.leave();
              })
          } else { msg.reply('you need to be in a voice channel for me to join.'); }
      };
});

function checkPing(msg) {
    msg.channel.send(`🏓 Pong! ${Date.now() - msg.createdTimestamp}ms.`);
};

function sendInfo(msg) {
    msg.channel.send("I am a bot created by <@177545650966233090>. Although he is my creator, there is only one true Great Old One I serve. :octopus:\nMy source code can be found on: <https://github.com/rvan-duy/cthulhu_bot>");
    msg.channel.send("https://thumbs.gfycat.com/SlimClutteredLeafhopper-size_restricted.gif");
};

function randomGif(msg) {
    let gifs = [
        "https://thumbs.gfycat.com/SlimClutteredLeafhopper-size_restricted.gif",
        "https://i.pinimg.com/originals/b8/55/55/b855551565f421ddd3da7ef5d2af59ea.gif",
        "https://giphy.com/gifs/deathwishcoffee-cthulhu-monster-scary-dZcMs4BOvrlKe7mTZ3",
        "https://giphy.com/gifs/made-by-abvh-dobrosav-bob-ivkovi-cthulhu-XF6yv5hA9NDO0",
        "https://media.tenor.com/images/4e2dd23908e77bf837049ea16e50e4d1/tenor.gif",
        "https://i.pinimg.com/originals/cf/58/c9/cf58c957d5b0ea8680cb78830f97695e.gif",
        "https://thumbs.gfycat.com/DaringSmoothGazelle-size_restricted.gif",
        "https://i.imgur.com/AnY9C.gif",
        "http://pa1.narvii.com/6902/8f20408a0b284a7ece7c66feb2eecf156cba670dr1-461-326_00.gif",
        "https://i.imgur.com/VkiDqa9.gif",
        "https://i.pinimg.com/originals/bd/7e/dd/bd7eddb482a23c361ba54a93e6e27be9.gif",
        "https://media1.tenor.com/images/3ebff28824839674873a61d27e88ee63/tenor.gif?itemid=17660276",
        "https://giphy.com/gifs/monster-cthulhu-seamonster-3oz8xvCmysN1VEZQZO",
        "https://img1.picmix.com/output/pic/normal/2/0/7/5/8745702_db1c4.gif",
        "https://i.imgur.com/hvI6jex.gif",
        "https://giphy.com/gifs/hp-lovecraft-photoshop-phriday-vastarien-10W2007N7EQsbC",
        "https://cdn140.picsart.com/263745167020202.gif?to=min&r=640",
        "https://i.gifer.com/8Qll.gif",
        "https://cdnb.artstation.com/p/assets/images/images/016/803/815/original/ruben-lara-dribbble-cthulhu.gif?1553539593",
        "https://i.imgur.com/4xwr7QU.gif?1",
        "https://i.pinimg.com/originals/6d/f1/59/6df159948bc9c0061ad2a7a0086d065b.gif",
        "https://i.imgur.com/yHwhL.gif",
        "https://i.imgur.com/ZxbhjES.gif",
        "https://giphy.com/gifs/sci-fi-science-fiction-literature-1bnecJczhD5gk",
        "https://media1.tenor.com/images/bf95b2ab780741eff0c0fe90e9adda13/tenor.gif?itemid=5869159",
        "https://i.pinimg.com/originals/65/05/d0/6505d08868d5a2e7e7619f1cf330adb1.gif",
    ];
    let gif = gifs[Math.floor(Math.random() * gifs.length)];
    msg.channel.send(gif);
    console.log("Gifs count: " + gifs.length);
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

function rollDice(msg, args) {
    // If there are no args - default 1d20
    if (!args[0])
        args[0] = "1d20";

    // If there is no "d" in args, we cannot roll
    if (!args[0].includes("d")) {
        msg.channel.send("Please make sure there is a 'd' character in your command.")
        return;
    }

    // Splitting args inbetween what comes before the "d" and after
    let numbers = args[0].split("d")
    if (numbers[0] > 400 || numbers[1] > 400) {
        msg.channel.send('I can only roll up to 400 dice/sides at the same time.')
        return;
    }

    // Checking if dice side is valid
    if (!numbers[1]) { msg.channel.send('Please specify the amount if sides the dice should have.'); return; }
    if (numbers[1] < 1 || isNaN(numbers[1])) { msg.channel.send('That is not a valid dice side.'); return; }
    
    // Announcing what we are rolling
    if (numbers[0] > 1) msg.channel.send('Rolling a total of ' + numbers[0] + ' dice, with ' + numbers[1] + ' sides:');
    else { msg.channel.send('Rolling 1 dice, with ' + numbers[1] + ' sides:'); numbers[0] = '1'; }

    // Generating the rolls and storing them into rollResults
    let rollResults = [];
    if (numbers[0] > 0) {
        for (let i = 0; i < numbers[0]; i++) {
            rollResults.push(' ' + Math.floor(Math.random() * numbers[1] + 1));
        }
        msg.channel.send(rollResults.toString());
    }
};

function leaveVoice(msg) {
    if (msg.guild.me.voice.channel) {
        msg.guild.me.voice.channel.leave();
        msg.channel.send(`The party is over I am leaving **${msg.member.voice.channel}**.`);
    }
};
