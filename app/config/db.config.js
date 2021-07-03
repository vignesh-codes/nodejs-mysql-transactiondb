module.exports = {
    HOST: "127.0.0.1",
    USER: "sammy",
    PASSWORD: "password",
    DB: "node",
    dialect: "mysql",
    PORT: 3306,
    // Defining DB connection timeout criteria
    pool: { 
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  