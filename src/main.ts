import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CoffeeModule } from './coffee/coffee.module'

async function bootstrap() {
  const coffee = await NestFactory.create(CoffeeModule)
  coffee.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  await coffee.listen(3000)
}
bootstrap()
