const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
