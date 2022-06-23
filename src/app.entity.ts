import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable()
  @ManyToMany(type => Flavor, flavor => flavor.apps)
  flavors: string[]
}