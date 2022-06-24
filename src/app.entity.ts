import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  brand: string

  @Column({ default: 0 })
  recommendations: number

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.apps,
    { cascade: true }
  )
  flavors: Flavor[]
}