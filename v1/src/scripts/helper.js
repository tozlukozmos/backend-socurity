const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");

const hashPass = (password) => {
    return CryptoJs.HmacSHA256(password, CryptoJs.HmacSHA1(password, process.env.PASS_SALT_KEY).toString()).toString();
};

const generateAccessToken = (user) => {
    return JWT.sign({ name: user.username, ...user}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "4d"});
}
const generateRefreshToken = (user) => {
    return JWT.sign({ name: user.username, ...user}, process.env.REFRESH_TOKEN_SECRET_KEY);
}

module.exports = {
    hashPass,
    generateAccessToken,
    generateRefreshToken
}