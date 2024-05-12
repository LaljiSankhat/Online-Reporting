const otpGenerater = require('otp-generator');

const otp = otpGenerater.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

console.log(otp);

module.exports = otp;
