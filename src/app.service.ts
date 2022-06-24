import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { App } from './app.entity'
import { CreateAppDto } from './create-app.dto'
import { Flavor } from './flavor.entity'
import { UpdateAppDto } from './update-app.dto'
import { PaginationQueryDto } from './pagination-query.dto'
import { Event } from './event.entity'

@Injectable()
export class AppService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>
  ) { }

  // getHello(): string { return 'Hello World!' }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.appRepository.find({
      relations: ["flavors"],
      skip: offset,
      take: limit
    })
  }

  async findOne(id: number) {
    const app = await this.appRepository.findOne(id, {
      relations: ["flavors"]
    })
    if (!app) {
      throw new NotFoundException(`Coffee #${id} not found.`)
    }
    return app
  }

  async create(dto: CreateAppDto) {
    const
      flavors = await Promise.all(
        dto.flavors.map(name => this.preloadFlavorByName(name))
      ),
      app = this.appRepository.create({ ...dto, flavors })
    return this.appRepository.save(app)
  }

  async update(id: number, dto: UpdateAppDto) {
    const
      flavors = dto.flavors && (
        await Promise.all(
          dto.flavors.map(name => this.preloadFlavorByName(name))
        )
      ),
      app = await this.appRepository.preload({
        id: +id,
        ...dto,
        flavors
      })
    if (!app) {
      throw new NotFoundException(`Coffee #${id} not found.`)
    }
    return this.appRepository.save(app)
  }

  async remove(id: number) {
    const app = await this.findOne(id)
    return this.appRepository.remove(app)
  }

  async recommendApp(app: App) {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      app.recommendations++

      const recommendEvent = new Event()

      recommendEvent.name = "recommend_app"
      recommendEvent.type = "app"
      recommendEvent.payload = { appId: app.id }

      await queryRunner.manager.save(app)
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
