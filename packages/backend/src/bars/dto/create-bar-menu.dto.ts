import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class BeerMenuItem {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  beerId: string;
}

export class CreateBarMenuDto {
  @IsNotEmpty()
  @IsString()
  manufacturerId: string;

  @IsNotEmpty()
  @IsArray()
  beers: BeerMenuItem[];
}
