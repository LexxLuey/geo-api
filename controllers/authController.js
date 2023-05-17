const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const saltRounds = 10;
const secretKey = 'your-secret-key'; // Replace with your own secret key

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering a user' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};
