import {IsNotEmpty, IsString} from 'class-validator'

export class CreateBeerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  alcoholContent: string;
}
