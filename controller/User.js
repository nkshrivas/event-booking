const User = require("../models/User");
const router = require("express").Router();

router.post('/register', (req, res) => {
    const userData = req.body;
  
    User.create(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create user' });
      });
  });
  
  router.get('/users', (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve users' });
      });
  });
  router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve user' });
      });
  });
  
  router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
  
    User.findByIdAndUpdate(userId, userData, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to update user' });
      });
  });
  router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    User.findByIdAndDelete(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.sendStatus(204);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to delete user' });
      });
  });
  
module.exports = router;
