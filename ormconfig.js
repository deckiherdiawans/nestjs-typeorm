module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["dist/**/*.entity{.js,.ts}"],
    migrations: ["dist/migrations/*{.js,.ts}"],
    cli: {
        migrationsDir: "src/migrations"
    }
}