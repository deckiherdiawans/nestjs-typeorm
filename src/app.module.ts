import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { App } from './app.entity'
import { AppService } from './app.service'
import { Flavor } from './flavor.entity'

const config = require("../config.json")

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([App, Flavor])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
