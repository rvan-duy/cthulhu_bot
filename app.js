// Extracting the right classes from discord.js and env
const Discord = require("discord.js");
require("dotenv").config();

// Creating an instance of a new Discord client
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const ytdl = require("ytdl-core");
const fs = require("fs");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("!info");
});

// The commands and their aliases
const commandPing = ["ping", "pin", "p"];
const commandCommands = ["commands", "command", "com", "c"];
const commandInfo = ["info", "help", "?"];
const commandGif = ["gif", "gifs", "gi", "g"];
const commandWhoDiesNext = ["whodiesnext", "wdn", "whodies"];
const commandSanity = ["sanity", "san", "s"];
const commandAskCthulhu = ["askcthulhu", "askc", "ac"];
const commandRoll = ["roll", "rolldice", "r", "rd"];
const command1920Music = ["1920music", "1920m", "1m"];
const commandHorrorMusic = ["horrormusic", "hmusic", "hm"];
const commandStop = ["stop", "st"];
const commandTigers = ["tiger", "tigers", "t"];
const commandRules = ["rules"];
const commandDHole = ["dhole", "dh"];
const commandQuote = ["quote", "quo", "q"];
const commandRandom = ["random", "ran", "lol"];
const commandAlias = ["alias", "ali", "a"];
const commandRandomList = ["randomlist", "ranl", "rl"];
const commandDeHaak = ["dehaak", "dh"];

// yes..
const random = ["regelen","voorniels","katje","indiaan","tigers2","oh","markie","tigerskahoot","wasrek","craycray","craycray2","chili","pindakaas","hanno","ohja", "smerig", "prr", "ja", "mongol", "bellenmetjelle", "jenzie", "lekkermattie", "gerrit", "chanterpanter", "helemaalcraycray", "ja!", "vraagteken", "melkoflimonade", "isdateenja", "kandat", "dehaak", "appleflap", "ohliebol1", "ohliebol2", "leldebol", "sjek", "daargingmijnstem", "wahib", "rarefetisj", "ayaya", "ikdurfniet", "nietpenisvrouw", "secretwriting"];

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
        processCommand(msg);
    
    // Check if the bot can troll someone with emoji reactions
    checkEmojiReactions(msg);
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
        msg.channel.send('```!info\n!commands\n!ping\n!alias [command name]\n!gif\n!quote\n!rules [game rule]\n!whodiesnext\n!sanity\n!1920music\n!horrormusic\n!tigers\n!dhole\n!askcthulhu [question]\n!roll [amount of dice]d[amount of dice-sides]\n!random [number/name]\n!randomlist```')
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
    if (commandRules.includes(command))
        sendRules(msg, args);
    if (commandDHole.includes(command))
        sendDHole(msg);
    if (commandQuote.includes(command))
        randomQuote(msg);
    if (commandAlias.includes(command))
        sendAlias(msg, args);
    if (commandRandomList.includes(command))
        sendRandomList(msg);
    if (commandDeHaak.includes(command))
        sendDeHaak(msg);
};

client.on('message', async msg => {
    if (!msg.guild || !msg.content.startsWith("!")) return;

    // Splitting up the command and its arguments
    let fullCommand = msg.content.substr(1);
    let splitCommand = fullCommand.split(' ');
    let command = splitCommand[0].toLowerCase();
    let args = splitCommand.slice(1);

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
        } else { msg.reply("you need to be in a voice channel for me to join."); }
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
    if (commandRandom.includes(command)) {
        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voice.channel) {
            if (random.indexOf(args[0]) > -1) {
                const connection = await msg.member.voice.channel.join();
                msg.channel.send(`:confetti_ball: Playing **${args[0]}** for you in **${msg.member.voice.channel}**.`);
                const dispatcher = connection.play("./random/random_" + (random.indexOf(args[0])+1) + ".mp4");
                dispatcher.on("finish", () => {
                    console.log("Finished playing random, disconnecting..");
                    dispatcher.destroy();
                    msg.guild.me.voice.channel.leave();
                })
            } else if (args[0] <= random.length && args[0] > 0) {
                args[0] = args[0] - 1;
                const connection = await msg.member.voice.channel.join();
                msg.channel.send(`:confetti_ball: Playing **${random[args[0]]}** for you in **${msg.member.voice.channel}**.`);
                const dispatcher = connection.play("./random/random_" + (args[0]+1) + ".mp4");
                dispatcher.on("finish", () => {
                    console.log("Finished playing random, disconnecting..");
                    dispatcher.destroy();
                    msg.guild.me.voice.channel.leave();
                })
            } else { msg.reply("which random voice message do you want? I have **" + fs.readdirSync("./random").length + "**. Type !random [number/name].") }
        } else { msg.reply('you need to be in a voice channel for me to join.'); }
    };
});

function checkPing(msg) {
    msg.channel.send(`🏓 Pong! ${Date.now() - msg.createdTimestamp}ms.`);
};

function sendInfo(msg) {
    msg.channel.send("I am a bot created by <@177545650966233090>. Although he is my creator, there is only one true Great Old One I serve. :octopus:\nTo see my commands type !commands\nMy source code can be found on: <https://github.com/rvan-duy/cthulhu_bot>");
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
    let characters = ['Jack Mccarthy', 'Rado McCain', 'Alberto Heijns', 'Zoubbi Loubbi', 'Tomas ???'];
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
        args[0] = "1d100";

    // If args is only numbers, roll that amount of sides
    if (!isNaN(args[0])) {
        if (args[0] < 1001 && args[0] > 0) {
            msg.channel.send("Rolling 1 dice, with " + args[0] + " sides:");
            msg.channel.send(Math.floor(Math.random() * args[0] + 1));
        }
        else msg.channel.send("I can only roll up to a 1000 sided dice.")
        return;
    }

    // If there is no "d" in args, we cannot roll
    if (!args[0].includes("d")) {
        msg.channel.send("I don't understand that, some examples of what I do understand are:\n```!roll 100\n!roll d100\n!roll 8d100```")
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

function sendRules(msg, args) {
    let rules = ["character-backstory", "character-creation", "character", "chase", "combat-damage", "combat-firearms",
                "combat-maneuver", "combat", "dice", "improvement", "sanity", "spells", "tome", "vehicles"];
    if (rules.includes(args[0])) {
        let text = fs.readFileSync("./rules/" + args[0] + ".txt", "utf8");
        msg.channel.send(text);
    } else {
        msg.channel.send("That is not one of the rules, try one of the following:\n```- character\n- character-backstory\n- character-creation\n- chase\n- combat\n- combat-damage\n- combat-firearms\n- combat-maneuver\n- dice\n- improvement\n- sanity\n- spells\n- tome\n- vehicles```");
    }
};

function sendDHole(msg) {
    msg.channel.send("The Dhole's House is the online toolkit for players and Keepers of the Call of Cthulhu role-playing game.\nLink: https://www.dholeshouse.org");
};

function randomQuote(msg) {
    let len = fs.readdirSync("./quotes").length;
    let quote = fs.readFileSync("./quotes/quote_" + Math.floor(Math.random() * len + 1) + ".txt", "utf8");
    msg.channel.send(quote);
};

function checkEmojiReactions(msg) {
    if (msg.content.toLowerCase().includes("lelde")) {
        msg.react("😍");
        console.log("Reacting to lelde with :heart_eyes:");
    }
    if (msg.content.toLowerCase().includes("cthulhu")) {
        msg.react("🐙");
        console.log("Reacting to cthulhu with :octopus:");
    }
    if (msg.content.toLowerCase().includes("rado")) {
        msg.react("🎵");
        console.log("Reacting to rado with :music_note:");
    }
};

function sendAlias(msg, args) {
    // I heard you liked if-statements
    args[0] = args[0].toLowerCase();
    if (commandPing.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandPing);
    else if (commandCommands.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandCommands);
    else if (commandInfo.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandInfo);
    else if (commandGif.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandGif);
    else if (commandWhoDiesNext.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandWhoDiesNext);
    else if (commandSanity.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandSanity);
    else if (commandAskCthulhu.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandAskCthulhu);
    else if (commandRoll.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandRoll);
    else if (command1920Music.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + command1920Music);
    else if (commandHorrorMusic.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandHorrorMusic);
    else if (commandStop.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandStop);
    else if (commandTigers.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandTigers);
    else if (commandRules.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandRules);
    else if (commandDHole.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandDHole);
    else if (commandQuote.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandQuote);
    else if (commandRandom.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandRandom);
    else if (commandAlias.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandAlias);
    else if (commandRandomList.includes(args[0]))
        msg.channel.send("Aliases for that command are:\n" + commandRandomList);
    else
        msg.channel.send("That is not a valid command. Use !alias [command name].");
};

function sendRandomList(msg) {
    msg.channel.send("List of random audio files:\n" + random);
};

function sendDeHaak(msg) {
    msg.channel.send(`"De Haak"`, {files: ["dehaak.png"]});
};