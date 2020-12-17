import {IsDateString, IsNotEmpty, IsPhoneNumber, IsString} from 'class-validator';

export class CreateBarDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsPhoneNumber('PL')
  phoneNumber: string;

  @IsNotEmpty()
  @IsDateString()
  operatingSinceDate: Date;
}
