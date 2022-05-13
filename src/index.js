const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const HelpCommand = require('./commands/HelpCommand');
const CreateCommand = require('./commands/CreateCommand');
const ProfileCommand = require('./commands/ProfileCommand');
const SellCommand = require('./commands/SellCommand');
const RobCommand = require('./commands/RobCommand');
const UpgradeCommand = require('./commands/UpgradeCommand');

const Player = require('./models/Player');


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
    presence: {
        activities: [
            {
                name: '-help',
                type: 'WATCHING'
            }
        ]
    }
});

client.on('ready', async () => {
    await mongoose.connect('db');
    setUpDatabase();
    console.log(`Logged in as ${client.user.tag}!`);
});


const commands = [new HelpCommand(), new CreateCommand(), new ProfileCommand(), new SellCommand(), new RobCommand(), new UpgradeCommand()];

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('-')) {
        const args = message.content.slice(1).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands.find(cmd => cmd.name === commandName || (cmd.aliases && cmd.aliases.filter(alias => alias === commandName)[0]));
        if (!command) return;

        command.execute(message, args);
    }
})


const setUpDatabase = () => {
    mongoose.model('Player', Player);
}


client.login('token');