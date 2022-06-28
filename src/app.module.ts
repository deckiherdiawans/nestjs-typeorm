import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module"
import { CoffeeModule } from "./coffee/coffee.module"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: false
        }),
        CoffeeModule,
        CoffeeRatingModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }