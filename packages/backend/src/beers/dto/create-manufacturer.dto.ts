import {IsNotEmpty, IsString} from 'class-validator'
import {Beer} from "../entities/beer.schema";

export class CreateManufacturerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  beers: Beer[]
}
