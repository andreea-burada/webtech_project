var crypto = require('crypto');
// Useful different methods that do not belong in other files

// Generate salt for password
const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
}

// Generate hash with salt for user password
// input: password - string
// output: hashedPassword - string; salt - string
const hashPassword = (password, salt) => {
    let hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hashedPassword;
}

// Verify password using salt from Student entity
const verifyPassword = (password, salt) => {
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
    return password === hash;
}

module.exports = {
    generateSalt, hashPassword, verifyPassword
}