const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = class SellCommand {


    name = 'sell';
    aliases = ['s'];


    execute(message, args) {
        // sell embed message



        const Player = mongoose.model('Player', PlayerSchema);

        Player.findOne({ id: message.author.id }, (err, player) => {
            if (err) console.log(err);
            if (!player) {
                message.reply('Player not found!');
                return;
            }

            /*const embed = new MessageEmbed()
                .setTitle('Sell')
                .setDescription('Sell your items')
                .setColor('#36d3eb')
                .setThumbnail(message.author.avatarURL())
                .addField('<:pirate:957745412607991890>Pirate', 'Sell your Pirate items for gold')
                .addField('<:tradingcompany:957745451338182666>Trading-Company', 'Sell your Trading-Company items for gold')
                .setTimestamp()
                .setFooter('© IdlePirate - 2022');
                message.reply({ embeds: [embed] });*/

            const earnedGold = (Math.round((new Date().getTime() - player.lastTime) / 1000 * 8));

            player.gold = player.gold + earnedGold;
            player.lastTime = new Date().getTime();

            player.save();

            const treasures = calculateTreasures(earnedGold, player.type);

            const treasureMap = [];

            for (const treasure of treasures) {
                const found = treasureMap.filter(t => t.name === treasure.name)[0];

                if (found) {
                    found.amount = found.amount + 1;
                } else {
                    treasureMap.push({ ...treasure, amount: 1 });
                }
            }

            console.log(treasureMap);

            const embed = new MessageEmbed()
                .setTitle(`Sold ${treasures.length} ${player.type === 'pirate' ? 'treasures' : 'fruits'} from your ship`)
                .setDescription(`
                ${treasureMap.map(t => t.emoji + ' ' + t.name + ` x${t.amount} | **${t.coins * t.amount}** <:gold:957745371440873562>`).join('\n')}

                Total: **${earnedGold}** <:gold:957745371440873562>
                You now have: **${player.gold}** <:gold:957745371440873562>
                `)
                .setColor('#36d3eb')
                .setFooter('© IdlePirate - 2022')
                .setTimestamp()

            const messageRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('custom_id')
                        .setLabel('Upgrade')
                        .setEmoji('<:ShipLvl4:957976733561278494>')
                        .setStyle('PRIMARY'),
                );

            message.reply({ embeds: [embed], components: [messageRow] });
        });
    }
}

function calculateTreasures(gold, type) {

    const treasures = [];

    switch (type) {
        case 'pirate':

            const treasureChests = Math.floor(gold / 100);

            if (gold >= 100) {
                for (var i = 0; i < treasureChests; i++) {
                    treasures.push({ name: 'Treasure Chest', emoji: '<:treasurechest:957745451338182666>', coins: 100 });
                }
            }

            const rum = Math.floor(gold / 500);

            if (gold >= 500) {
                for (var i = 0; i < rum; i++) {
                    treasures.push({ name: 'Rum', emoji: '<:rum:957745434548392037>', coins: 500 });
                }
            }

            break;
        case 'trading':

            const bananas = Math.floor(gold / 100);

            if (gold >= 100) {
                for (var i = 0; i < bananas; i++) {
                    treasures.push({ name: 'Banana', emoji: '<:bamame:957745346186969138>', coins: 100 });
                }
            }

            const mangos = Math.floor(gold / 250);

            if (gold >= 250) {
                for (var i = 0; i < mangos; i++) {
                    treasures.push({ name: 'Mango', emoji: '<:mangolohoki:957745389853868062>', coins: 250 });
                }
            }

            break;
    }

    return treasures;
}
