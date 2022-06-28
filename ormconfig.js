module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/**/entities/*.entity{.js,.ts}"],
    migrations: ["dist/migrations/*{.js,.ts}"],
    cli: {
        migrationsDir: "src/migrations"
    }
}