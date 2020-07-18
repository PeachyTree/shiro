class Utils {
  static base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} is not a supported base64 mode.`);
	}

  static formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
      minimumFractionDigits,
      maximumFractionDigits: 2
    });
  }
    
  static shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  }

  static embedURL(title, url, display) {
		return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
  }
  
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}

module.exports = Utils;