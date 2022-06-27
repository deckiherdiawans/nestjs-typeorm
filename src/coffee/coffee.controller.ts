import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common'
import { CoffeeService } from './coffee.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { PaginationQueryDto } from './dto/pagination-query.dto'

@Controller("coffee")
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) { }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery)
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.coffeeService.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateCoffeeDto) {
    return this.coffeeService.create(dto)
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, dto)
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.coffeeService.remove(id)
  }
}
