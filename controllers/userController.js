const prisma = require('../config/database');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};
