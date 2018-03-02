const jwt = require('jsonwebtoken');
const User = require('./userModel.js');

// Remove the example file and uncomment the below
// const dbconfig = require('../../db/dbconfig.js');
const dbconfig = require('../../db/example_dbconfig.js');

const controller = {
  signin: function(req, res, next) {
    User.findOne({
      where: {
        username: req.query.username
      }
    })
    .then(function(user) {
      if (user && User.validatePW(req.query.password, user.password)) {
        const token = jwt.sign({
          user: user.username,
          id: user.id
        },
        dbconfig.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        return res.json({
          username: user.username,
          success: true,
          token: token
        });
      }

      return res.status(403).send('Invalid username or password');
    });
  },

  create: function(req, res, next) {
    const password = User.generateHash(req.body.password);

    User.findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        password: password
      }
    })
    .spread(function(user, created) {
      if (created) {
        const token = jwt.sign({
          user: user.username,
          id: user.id
        },
        dbconfig.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        return res.json({
          success: true,
          token: token
        });
      }

      return res.sendStatus(500);
    })
    .catch(function(err) {
      if (err.original.code === '23505') {
        return res.status(403).send('That username address already exists, please login');
      }
      console.log('Error creating user: ', err);
      return res.sendStatus(500);
    });
  },

  authenticate: function(req, res, next) {
    const token = req.headers.token;
    jwt.verify(token, dbconfig.secret, function(err, payload) {
      if (err) {
        res.status(403).send('Invalid authentication token');
      } else {
        res.status(200).send({
          user: payload.user,
          id: payload.id
        });
      }
    });
  }
};

module.exports = controller;
