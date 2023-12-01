var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const State = sequelize.define('State', {
  // Model attributes are defined here
  state_name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  capital: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  state_bird: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
}, {
  // Other model options go here
});

async function connectToDB() {
  try {
    sequelize.authenticate().then(async () => {
      // await State.sync({ alter: true });
    })
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectToDB();

/* GET a new resource */
router.get('/state', async function(req, res, next) {
  const state = await State.findByPk(req.query.id);
  if (state) {
    res.send(state)
  } else {
    res.status(404).send("state not found");
  }
});


router.get('/', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET a new resource */
router.get('/newEndpoint', function(req, res, next) {
  res.send({ yourParam: req.query.someParam });
});

module.exports = router;
