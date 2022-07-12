import { NestFactory } from '@nestjs/core'
import { CoffeeModule } from './coffee/coffee.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  const
    options = new DocumentBuilder()
      .setTitle("ILuvCoffee")
      .setDescription("Coffee Application")
      .setVersion("1.0.0")
      .build(),
    document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
