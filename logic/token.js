import jwt from "jsonwebtoken";

function generateToken(userId) {
    const payload = { userId };
    const secretKey = 'skauidgfh978364bgoisdauiy3456ersahGQY53';
    const options = { expiresIn: '100 years' };

    return jwt.sign(payload, secretKey, options);
}

export default generateToken;