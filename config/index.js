const app = require('./express');
const database = require('./database');

const port = process.env.PORT || 3000;

// Define your API endpoints here
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
