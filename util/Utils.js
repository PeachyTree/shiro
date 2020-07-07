class Utils {
    static base64(text, mode = "encode") {
        if (mode === "encode") return Buffer.from(text).toString("base64");
        if (mode === "decode") return Buffer.from(text, "base64").toString("utf8") || null;
        throw new TypeError(`${mode} is not a supported Base64 mode`);
    }

    static formatNumberK(number) {
		return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
    }
    
    static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}
}

module.exports = Utils;