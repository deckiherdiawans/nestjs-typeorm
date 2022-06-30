import { NestFactory } from '@nestjs/core'
import { CoffeeModule } from './coffee/coffee.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(CoffeeModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  await app.listen(3000)
}
bootstrap()
