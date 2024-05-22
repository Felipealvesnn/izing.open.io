require("../app/config-env");

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin"
    // freezeTableName: true
  },
  pool: {
    max: parseInt(process.env.POSTGRES_POOL_MAX ?? '100', 10) || 100,
    min: parseInt(process.env.POSTGRES_POOL_MIN ?? '0', 10) || 0,  // Corrigi para 0 para evitar erro
    acquire: parseInt(process.env.POSTGRES_POOL_ACQUIRE ?? '', 10) || 30000,
    idle: parseInt(process.env.POSTGRES_POOL_IDLE ?? '', 10) || 10000
  },
  dialect: process.env.DB_DIALECT || "postgres",
  timezone: "UTC",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.DB_PORT ?? '10', 10) || 5432,
  database: process.env.POSTGRES_DB || "izing",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  logging: false
};
