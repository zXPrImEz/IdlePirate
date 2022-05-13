const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = class HelpCommand {

    name = 'help';
    aliases = ['h'];

    execute(message, args) {
        const embed = new MessageEmbed()
        .setTitle('Help')
        .setColor('#36d3eb')
        .setDescription(`

        > -create | create a new player
        > -sell | sell your items
        > -upgrade | upgrade your ship
        > -rob | rob a player
        > -profile | view your profile
        
        `)
        .setTimestamp()
        .setFooter('© IdlePirate - 2022');
    message.reply({ embeds: [embed] });
    }

}