const Command = require('../../structures/Command');
const { Parser } = require('expr-eval');

module.exports = class CalculateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'calculate',
			aliases: ['mathematics', 'math'],
			group: 'productivity',
			memberName: 'calculate',
			description: 'Evaluates a math expression.',
			args: [
				{
					key: 'expression',
					prompt: 'What expression do you want to evaluate?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { expression }) {
		try {
			const evaluated = Parser.evaluate(expression).toString();
			return msg.reply(evaluated).catch(() => msg.reply('Invalid expression.'));
		} catch {
			return msg.reply('Invalid expression.');
		}
	}
};