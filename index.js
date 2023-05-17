const app = require('./config/express');
const database = require('./config/database');

const port = process.env.PORT || 3000;

// Define your API routes
app.use('/users', require('./routes/userRoutes'));
app.use('/locations', require('./routes/locationRoutes'));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
