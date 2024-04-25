import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const jwtValidation = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token.' });
  }

  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_=]+$/;

  if (token.includes(' ') || token.length < 100 || !jwtRegex.test(token)) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;

    function isNumber(id) {
      return (
        !isNaN(id) &&
        id !== true &&
        id !== false &&
        (typeof id === 'number' || id instanceof Number)
      );
    }

    const isIdNumber = isNumber(userId);

    if (isIdNumber) {
      req.decodedUserId = userId;
      next();
    } else {
      return res.status(401).json({ error: 'Token inválido.' });
    }

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expirado.' });
    }
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

export default jwtValidation;
