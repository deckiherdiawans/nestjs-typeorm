import { Module } from '@nestjs/common'
import { CoffeeRatingController } from './coffee-rating.controller'
import { CoffeeRatingService } from './coffee-rating.service'
import { CoffeeModule } from '../coffee/coffee.module'

@Module({
    imports: [CoffeeModule],
    controllers: [CoffeeRatingController],
    providers: [CoffeeRatingService]
})
export class CoffeeRatingModule { }
