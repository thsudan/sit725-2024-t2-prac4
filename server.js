const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const mongoURI = 'mongodb+srv://s224589292:ayQ8yTJGRyJF2hzL@cluster0.ctiaqgd.mongodb.net/parking_db?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone: String,
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const { full_name, email, phone, username, password } = req.body;
  const newUser = new User({
    full_name,
    email,
    phone,
    username,
    password
  });

  newUser.save()
    .then(() => {
      console.log('User added to database');
      res.redirect('/signup'); // Redirect to signup page after submission
    })
    .catch(err => {
      console.error('Error saving user:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signup.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
