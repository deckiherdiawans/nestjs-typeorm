import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Connection, Repository } from "typeorm"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { UpdateCoffeeDto } from "./dto/update-coffee.dto"
import { PaginationQueryDto } from "./dto/pagination-query.dto"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "../event/entities/event.entity"

@Injectable()
export class CoffeeService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    @Inject("COFFEE_BRANDS") coffeeBrands: string[]
  ) {
    console.log(coffeeBrands)
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.coffeeRepository.find({
      relations: ["flavors"],
      skip: offset,
      take: limit
    })
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ["flavors"]
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found.`)
    }
    return coffee
  }

  async create(dto: CreateCoffeeDto) {
    const
      flavors = await Promise.all(
        dto.flavors.map(name => this.preloadFlavorByName(name))
      ),
      coffee = this.coffeeRepository.create({ ...dto, flavors })
    return this.coffeeRepository.save(coffee)
  }

  async update(id: number, dto: UpdateCoffeeDto) {
    const
      flavors = dto.flavors && (
        await Promise.all(
          dto.flavors.map(name => this.preloadFlavorByName(name))
        )
      ),
      coffee = await this.coffeeRepository.preload({
        id: +id,
        ...dto,
        flavors
      })
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found.`)
    }
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: number) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      coffee.recommendations++

      const recommendEvent = new Event()

      recommendEvent.name = "recommend_coffee"
      recommendEvent.type = "coffee"
      recommendEvent.payload = { coffeeId: coffee.id }

      await queryRunner.manager.save(coffee)
      await queryRunner.manager.save(recommendEvent)
      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.commitTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name })
    if (existingFlavor) { return existingFlavor }
    return this.flavorRepository.create({ name })
  }
}
