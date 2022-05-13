const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

module.exports = class RobCommand {

    name = 'rob';

    execute(message, args) {

        const Player = mongoose.model('Player', PlayerSchema);

        Player.findOne({ id: message.author.id }, (err, player) => {
            if (err) console.log(err);
            if (!player) {
                message.reply('Player not found!');
                return;
            }

            const embed = new MessageEmbed()
                .setTitle('Rob')
                .setDescription('Rob someone')
                .setColor('#36d3eb')
                .setDescription(`
                Your robbed gold from a ${player.type === 'trading' ? 'Pirate <:pirate:957745412607991890>' : 'Trading-Company <:tradingcompany:957745451338182666>'}

                Total: **TEST**
                You now have **\`${player.gold}\`**<:goldos:957745371440873562>
                `)
                .setTimestamp()
                .setFooter('© IdlePirate - 2022'); 

            message.reply({ embeds: [ embed ]});
        });
    }

}