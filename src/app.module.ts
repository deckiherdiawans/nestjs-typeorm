import { Module } from '@nestjs/common'
import { CoffeeModule } from "./coffee/coffee.module"
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module"

@Module({
  imports: [CoffeeModule, CoffeeRatingModule]
})
export class AppModule { }
