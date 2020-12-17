import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class BeerMenuItem {
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  beerId: string;
}

export class CreateBarMenuDto {
  _id: string;

  @IsNotEmpty()
  @IsString()
  manufacturerId: string;

  @IsNotEmpty()
  @IsArray()
  beers: BeerMenuItem[];
}
