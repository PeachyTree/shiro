const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const h = new (require("html-entities").AllHtmlEntities)();
const db = require('quick.db');
const { GEM_EMOJI_ID } = process.env;

class Trivia extends Command {
  constructor(client) {
    super(client, { 
      name: "trivia",
      description: "Put your general knowledge to the test and earn Gems!",
      category: "Games",
      usage: "trivia [difficulty (easy | medium | hard)]",
      aliases: ["randomtrivia", "testme", "quiz"]
    });
  }

  async run(message, args) { 
    try {
      let earned = "4"; // Amount of Gems, earned after a user got the right answer
      let lost = "2"; // Amount of Gems, lost after a user got the wrong answer

      const levels = ["easy", "medium", "hard"];
      const difficulty = args[0] || "medium";
      if (!levels.includes(difficulty.toLowerCase())) return message.reply("Command Usage: `trivia [difficulty (easy | medium | hard)]`");

      const { body } = await request.get(`https://opentdb.com/api.php?amount=50&difficulty=${difficulty.toLowerCase()}&type=multiple`);
      const quiz = body.results.random();
      const choices = quiz.incorrect_answers.map(ans => h.decode(ans));
      choices.push(h.decode(quiz.correct_answer));

      const randomChoices = new Array(4);
      for (let i = 0; i < 4; i++) {
        randomChoices[i] = choices.random();
        choices.splice(choices.indexOf(randomChoices[i]), 1);
      }

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("Trivia", "https://vgy.me/9UDUk0.png")
        .addField('**Question**', `${h.decode(quiz.question)}\n:regional_indicator_a: ${randomChoices[0]}\n:regional_indicator_b: ${randomChoices[1]}\n:regional_indicator_c: ${randomChoices[2]}\n:regional_indicator_d: ${randomChoices[3]}`)
        .addField('**Category & Difficulty**', `${h.decode(quiz.category)} | ${h.decode(quiz.difficulty.toProperCase())}`)
        .setFooter("Reply with the correct letter within 60 seconds!", message.author.displayAvatarURL);
      const question = await this.client.awaitEmbedReply(message, "", m => m.author.id === message.author.id, 60000, {embed: embed});
      if (!question) return message.channel.send("**Trivia session ended**\nThe session timed out as you did not answer within 60 seconds.");

      const choice = randomChoices[["a", "b", "c", "d"].indexOf(question.toLowerCase())];
      if (!choice) return message.channel.send("That's not a valid answer!\nFor future reference, please ensure your answer is either **A**, **B**, **C**, or **D** (lowercase and uppercase are both accepted).");
      if (choice === h.decode(quiz.correct_answer)) return db.add(`gems_${message.author.id}`, 4) , message.channel.send(`☑️ | Well done, your answer is correct! You also earned ${earned} ${GEM_EMOJI_ID}\nTrivia session ended.`);
      else return db.subtract(`gems_${message.author.id}`, 2) , message.channel.send(`Unfortunately, that's the wrong answer. Sadly, you also lost ${lost} ${GEM_EMOJI_ID}.\nThe correct answer was **${h.decode(quiz.correct_answer)}**, and you chose **${choice}**.\nTrivia session ended.`);
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Trivia;
