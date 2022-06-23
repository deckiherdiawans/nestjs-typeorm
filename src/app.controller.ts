import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { CreateAppDto } from './create-app.dto'
import { UpdateAppDto } from './update-app.dto'

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string { return this.appService.getHello() }

  @Get()
  findAll() { return this.appService.findAll() }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.appService.findOne(id)
  }

  @Post()
  // create(@Body() dto: CreateAppDto) {
  //   return this.appService.create(dto)
  // }
  post() {
    const status = { message: HttpStatus.CREATED }
    return status
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateAppDto) {
    return this.appService.update(id, dto)
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.appService.remove(id)
  }
}
