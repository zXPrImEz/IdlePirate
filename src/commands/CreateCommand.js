const PlayerSchema = require('../models/Player.js');
const mongoose = require('mongoose');

module.exports = class CreateCommand {

    name = 'create';
    aliases = ['c'];

    execute(message, args) {


        if(!args[0]) {
            message.reply('<:pirate:957745412607991890>Pirate or <:tradingcompany:957745451338182666>Trading-Company:');
            return;
        }

        let type = '';

        switch(args[0]) {
            case 'pirate':
                type = 'pirate';
                break;
            case 'trading-company':
            case 'trading':
            case 'company':
                type = 'trading';
                break;
        }

        // create player if not exists

        const Player = mongoose.model('Player', PlayerSchema);

        Player.findOne({ id: message.author.id }, (err, player) => {
            if (err) console.log(err);
            if (!player) {
                const newPlayer = new Player({ id: message.author.id, type: type, lastTime: Date.now(), gold: 0, created: Date.now() });
                newPlayer.save((err) => {
                    if (err) console.log(err);
                    message.reply('Player created!');
                });
            } else {
                message.reply('Player already exists!');
            }
        });
    }

}