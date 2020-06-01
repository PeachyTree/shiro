// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Roll extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      description: "Rolls the specified amount of dice, with specified modifiers, and shows you the outcomes.",
      category: "Fun",
      usage: "c.roll [NO_OF_DICE] [FACES] [ADDITIVE_MODIFIER] [MULTIPLIER]"
    });
  }

  async run(message, args, level, settings) { 

    let dice = args[0]
    let faces = args[1]
    let additiveModifier = args[2]
    let multiplier = args[3]

    if (additiveModifier === undefined) additiveModifier = 0;
    if (multiplier === undefined) multiplier = 1;

    let outcomes = [
      1, 2, 3, 4, 5, 6
    ];
    let outcome = faces === 6 ? outcomes[Math.floor(Math.random() * outcomes.length)] : Math.floor(Math.random(faces) * outcomes.length);

    if (Object.keys(args).indexOf('additiveModifier') < Object.keys(args).indexOf('multiplier')) {
      outcome += additiveModifier;
      outcome *= multiplier;
    }
    else {
      outcome *= multiplier;
      outcome += additiveModifier;
    }

    if (dice) {
      if (dice > 50) dice = 50;

      for (let i = 1; i < dice; i++) {
        let tempOutcome = faces === 6 ? outcomes[Math.floor(Math.random() * outcomes.length)] : Math.floor(Math.random(faces) * outcomes.length);

        if (Object.keys(args).indexOf('additiveModifier') < Object.keys(args).indexOf('multiplier')) {
          tempOutcome += additiveModifier;
          tempOutcome *= multiplier;
        }
        else {
          tempOutcome *= multiplier;
          tempOutcome += additiveModifier;
        }

        outcome += `, ${tempOutcome}`;
      }
    }
    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("__**Rolled:**__")
      .setDescription(outcome)
    await message.channel.send({ embed });
  };
}

module.exports = Roll;
