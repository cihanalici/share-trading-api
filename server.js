require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { sequelize } = require('./models');
const portfoliosRouter = require('./routes/portfolios');
const sharesRouter = require('./routes/shares');
const tradesRouter = require('./routes/trades');
const authRouter = require('./routes/auth').router;

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/shares', sharesRouter);
app.use('/portfolios', portfoliosRouter);
app.use('/trades', tradesRouter);

// Create a separate Sequelize instance to manage the connection for creating the database
const initialSequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// Function to create the database if it doesn't exist
const createDatabaseIfNotExists = async () => {
    try {
        await initialSequelize.query(`CREATE DATABASE ${initialSequelize.getDatabaseName()}`);
        console.log(`Database ${initialSequelize.getDatabaseName()} created successfully.`);
    } catch (error) {
        // Ignore the error if the database already exists
        if (error.name === 'SequelizeDatabaseError' && error.original.code === '42P04') {
            console.log(`Database ${initialSequelize.getDatabaseName()} already exists.`);
        } else {
            throw error;
        }
    }
};

// Initialize the database
createDatabaseIfNotExists()
    .then(() => {
        // Connect to the database after ensuring it exists
        return sequelize.authenticate();
    })
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
