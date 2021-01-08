const { OWNER, 
  ADMIN, 
  SUPPORT, 
  SHIRO_PREFIX, 
  MOD_ROLE, 
  ADMIN_ROLE
} = process.env;

const config = {
  "owner": OWNER, // ID of the Bot Owner. Has access to Bot Owner commands.
  "admins": ADMIN, // ID of Bot Admin. Not required.
  "support": SUPPORT, // ID of Bot Support. Not required.

  defaultSettings: {
    "prefix": SHIRO_PREFIX,
    "modRole": MOD_ROLE, // Default mod role.
    "adminRole": ADMIN_ROLE // Default admin role.
  },
  
  permLevels: [
    { level: 1,
      name: "User", 
      check: () => true
    },
    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    { level: 10,
      name: "Bot Owner", 
      check: (message) => config.owner.includes(message.author.id)
    }
  ]
};

module.exports = config;
