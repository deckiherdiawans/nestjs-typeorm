import { Module } from '@nestjs/common'
import { CoffeeRatingController } from './coffee-rating.controller'
import { CoffeeRatingService } from './coffee-rating.service'
import { CoffeeModule } from '../coffee/coffee.module'
import { DatabaseModule } from 'src/database/database.module'

@Module({
    imports: [CoffeeModule,
        DatabaseModule.register({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            password: process.env.DB_PASSWORD
        })
    ],
    controllers: [CoffeeRatingController],
    providers: [CoffeeRatingService]
})
export class CoffeeRatingModule { }
