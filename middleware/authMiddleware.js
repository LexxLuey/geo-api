const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your own secret key
const prisma = require('../config/database');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
