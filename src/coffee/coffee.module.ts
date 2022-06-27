import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoffeeController } from "./coffee.controller"
import { CoffeeService } from "./coffee.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "../event/entities/event.entity"
import { Connection } from "typeorm"

const config = require("../config.json")

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Coffee, Flavor, Event])
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService,
    {
      provide: "COFFEE_BRANDS",
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(["Buddy Brew", "Nescafe"])
        console.log("[!] Async factory")
        return coffeeBrands
      },
      inject: [Connection]
    }
  ],
  exports: [CoffeeService]
})
export class CoffeeModule { }
