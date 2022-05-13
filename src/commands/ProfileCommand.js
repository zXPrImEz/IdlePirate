const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

module.exports = class ProfileCommand {

    name = 'profile';
    aliases = ['p'];

    execute(message, args) {


        const Player = mongoose.model('Player', PlayerSchema);

        Player.findOne({ id: message.author.id }, (err, player) => {
            if (err) console.log(err);
            if (!player) {
                message.reply('Player not found!');
                return;
            }

            const embed = new MessageEmbed()
                .setTitle('Profile')
                .setDescription('Your Charakter')
                .setColor('#36d3eb')
                .setThumbnail(message.author.avatarURL())
                /*.addFields(
                    { name: 'Job', value: `\`${player.type}\``, inline: true },
                    { name: 'Gold', value: `\`${player.gold}\``, inline: true },
                    { name: 'Joined', value: new Date(player.created), inline: true }

                )*/
                .addField('Job', `\`${player.type}\``, true)
                .addField('Gold', `\`${player.gold}\``, true)
                .addField('Joined', new Date(player.created).toUTCString(), true)
                .setTimestamp()
                .setFooter('© IdlePirate - 2022');
            message.reply({ embeds: [ embed ] });
        });
    }

}