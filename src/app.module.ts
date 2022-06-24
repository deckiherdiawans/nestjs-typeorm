import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { App } from './app.entity'
import { AppService } from './app.service'
import { Flavor } from './flavor.entity'
import { Event } from './event.entity'

const config = require("../config.json")

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([App, Flavor, Event])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
