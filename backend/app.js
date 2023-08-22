const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/formdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const Form = mongoose.model('Form', FormSchema);

// Verify Token Middleware
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

app.post('/register', async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new Form(formData);
    await newForm.save();
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Form.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ userId: user._id, name: user.name }, 'your_secret_key', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/protected', verifyToken, (req, res) => {
  const user = req.user;
  res.json({ message: 'Protected route accessed', user });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
