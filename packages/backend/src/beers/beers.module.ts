import { Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Manufacturer,
  ManufacturerSchema,
} from './entities/manufacturer.schema';
import { Beer, BeerSchema } from './entities/beer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manufacturer.name,
        schema: ManufacturerSchema,
      },
      {
        name: Beer.name,
        schema: BeerSchema,
      },
    ]),
  ],
  controllers: [BeersController],
  providers: [BeersService],
})
export class BeersModule {}
