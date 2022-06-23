import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { App } from "./app.entity"

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(type => App, app => app.flavors)
  apps: App[]
}
