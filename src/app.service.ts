import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { App } from './app.entity'
import { CreateAppDto } from './create-app.dto'
import { UpdateAppDto } from './update-app.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) { }

  // getHello(): string { return 'Hello World!' }

  findAll() { return this.appRepository.find() }

  async findOne(id: number) {
    const app = await this.appRepository.findOne(id)
    if (!app) {
      throw new NotFoundException(`Coffee #${id} not found.`)
    }
    return app
  }

  create(dto: CreateAppDto) {
    const app = this.appRepository.create(dto)
    return this.appRepository.save(app)
  }

  async update(id: number, dto: UpdateAppDto) {
    const app = await this.appRepository.preload({
      id: +id,
      ...dto
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
}
