const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

module.exports = class UpgradeCommand {

    name = 'upgrade';
    aliases = ['up'];

    execute(message, args) {
        // upgrade ship embed message

        const Player = mongoose.model('Player', PlayerSchema);

        Player.findOne({ id: message.author.id }, (err, player) => {
            if (err) console.log(err);
            if (!player) {
                message.reply('Player not found!');
                return;
            }

            const embed = new MessageEmbed()
                .setTitle('Upgrade')
                .setDescription('Upgrade your ship')
                .setColor('#36d3eb')
                .addField('You upgrade your ship for', '<:goldos:957745371440873562>**\`' + player.upgradeCost + '\`**')
                .addField('Your ship is now level', '**\`' + player.shipLevel + '\`**')
                .addField('You now have', '<:goldos:957745371440873562>**\`' + player.gold + '\`**')
                .setTimestamp()
                .setFooter('© IdlePirate - 2022');
            message.reply({ embeds: [embed] });
        });
    }

}