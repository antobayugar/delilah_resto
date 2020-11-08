const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const firma = process.env.JWT_KEY;

module.exports = {
    jwt,
    firma
}