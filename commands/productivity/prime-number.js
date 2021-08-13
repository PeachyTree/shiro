const Command = require('../../structures/Command');

module.exports = class PrimeNumberCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prime-number',
			aliases: ['prime', 'is-prime'],
			group: 'productivity',
			memberName: 'prime-number',
			description: 'Checks if a number is a prime number.',
			args: [
				{
					key: 'n',
					prompt: 'What number do you want to check?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { n }) {          
        const isPrime = n => {
            if (isNaN(n) || !isFinite(n) || n%1 || n < 2) return false;
            if (n%2 == 0) return (n == 2);
            if (n%3 == 0) return (n == 3);
            const m = Math.sqrt(n);
            for (let i = 5; i <= m; i += 6) {
                if (n%i == 0) return false;
                if (n%(i + 2) == 0) return false;
            }
            return true;
        };
        if (isPrime(n) === true) {
            return msg.say(`**${n}** is a prime number.`);
        }
        if (isPrime(n) === false) {
            return msg.say(`**${n}** is not a prime number.`);
        }
	}
};