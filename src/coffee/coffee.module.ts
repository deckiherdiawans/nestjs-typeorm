import { Module, Scope } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoffeeController } from "./coffee.controller"
import { CoffeeService } from "./coffee.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "../event/entities/event.entity"
import { COFFEE_BRANDS } from "./coffee.constants"

@Module({
  imports: [
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
