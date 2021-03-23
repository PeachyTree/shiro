const Command = require("../Command");

class PrimeNumber extends Command {
    constructor(client) {
      super(client, {
        name: "prime-number",
        description: "Checks if a number is a prime number.",
        category: "Productivity",
        usage: "prime-number <Number>",
        aliases: ["prime", "is-prime"]
      });
    }

    async run(message, args) { 
        try {
            const n = parseInt(args[0]);
            if (!n) return message.channel.send("Command Usage: `prime-number <Number>`");
            
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
                message.channel.send(`**${n}** is a prime number.`);
            }

            if (isPrime(n) === false) {
                message.channel.send(`**${n}** is not a prime number.`);
            }
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = PrimeNumber;
