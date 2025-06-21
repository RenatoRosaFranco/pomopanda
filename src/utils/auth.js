import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
}
