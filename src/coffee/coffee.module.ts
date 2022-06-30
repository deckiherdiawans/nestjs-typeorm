import { Module, Scope } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoffeeController } from "./coffee.controller"
import { CoffeeService } from "./coffee.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "../event/entities/event.entity"
import { COFFEE_BRANDS } from "./coffee.constants"
import coffeeConfig from "./config/coffee.config"
import * as Joi from "@hapi/joi"
import appConfig from "../config/app.config"

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: "postgres",
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: false
            })
        }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_HOST: Joi.required(),
                DB_PORT: Joi.number().default(5432)
            }),
            load: [appConfig]
        }),
        ConfigModule.forFeature(coffeeConfig),
        TypeOrmModule.forFeature([Coffee, Flavor, Event])
    ],
    controllers: [CoffeeController],
    providers: [CoffeeService,
        {
            provide: COFFEE_BRANDS,
            useFactory: () => ["Buddy Brew", "Nescafe"],
            scope: Scope.TRANSIENT
        }
    ],
    exports: [CoffeeService]
})
export class CoffeeModule { }