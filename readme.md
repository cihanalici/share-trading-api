# **Trading API**

This project provides a backend RESTful API for a trading platform where users can register, manage portfolios, and trade shares (BUY/SELL). The API ensures that trades are executed at the latest prices and handles various conditions like portfolio and share registration.

## **Table of Contents**

- [**Trading API**](#trading-api)
  - [**Table of Contents**](#table-of-contents)
  - [**Features**](#features)
  - [**Prerequisites**](#prerequisites)
  - [**Getting Started**](#getting-started)
    - [**1. Clone the Repository**](#1-clone-the-repository)
    - [**2. Install Dependencies**](#2-install-dependencies)
  - [**Project Setup**](#project-setup)
    - [**1. Environment Variables**](#1-environment-variables)
    - [**2. Database Setup**](#2-database-setup)
  - [**Running the Application**](#running-the-application)
  - [**API Endpoints**](#api-endpoints)

## **Features**

- User registration and authentication using JWT.
- Portfolio creation and management.
- Share registration and price updates.
- BUY and SELL trades executed at the latest market price.
- Validation to ensure that only registered shares and portfolios are used in trades.

## **Prerequisites**

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/cihanalici/share-trading-api.git
cd trading-api

```

### **2. Install Dependencies**

```bash
npm install
```

## **Project Setup**

### **1. Environment Variables**

Create a `.env` file in the root directory and add the following environment variables:

```bash
JWT_SECRET=your_super_secret_key
DATABASE_URL=postgres://postgres:test@localhost:5432/share_trading_dev
```

counfigure the config.json file in the config folder for the database connection.

```bash
{
  "development": {
    "username": "postgres",
    "password": "test",
    "database": "share_trading_dev",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "test",
    "database": "share_trading_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "test",
    "database": "share_trading_prod",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

### **2. Database Setup**

Sequelize is used as the ORM for interacting with the PostgreSQL database. (This process output the The file config\config.json already exists. You can ignore this step)

```bash
npx sequelize-cli init
```

This will create the following directories:

- `config`: Contains the database configuration.
- `migrations`: Contains the migration files.
- `models`: Contains the model files.
- `seeders`: Contains the seed files.
- `database.json`: Contains the database configuration for different environments.

Create the database:

```bash
npx sequelize-cli db:create
```

Run the migrations:

```bash
npx sequelize-cli db:migrate
```

Seed the database with initial data:

```bash
npx sequelize-cli db:seed:all
```

## **Running the Application**

To start the application, run:

```bash
npm start
or
npm run dev (for development nodemon)
```

The application will be available at `http://localhost:3000`.

## **API Endpoints**

The API documentation is available at [Postman Link](https://crimson-meadow-2203.postman.co/workspace/Cihanalici~7f8fd255-e541-45ac-82c4-6b44afac9dee/collection/26285529-5e6da4b9-1733-454a-8e6b-3392d10846da?action=share&creator=26285529).

For more details for API endpoint i added postman collection to the project. You can import it to your postman and test the endpoints.
