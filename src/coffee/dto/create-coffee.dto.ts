import { IsString } from "class-validator"

export class CreateCoffeeDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly description: string

  readonly recommendations: number

  @IsString({ each: true })
  readonly flavors: string[]
}