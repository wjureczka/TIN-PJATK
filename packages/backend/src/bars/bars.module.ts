import { Module } from '@nestjs/common';
import { BarsService } from './bars.service';
import { BarsController } from './bars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bar, BarSchema } from './entities/bar.schema';
import {BarMenu, BarMenuSchema} from "./entities/barMenu.schema";
import {BeerPrice, BeerPriceSchema} from "./entities/beerPrice.schema";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bar.name,
        schema: BarSchema,
      },
      {
        name: BarMenu.name,
        schema: BarMenuSchema,
      },
      {
        name: BeerPrice.name,
        schema: BeerPriceSchema,
      },
    ]),
    UsersModule
  ],
  controllers: [BarsController],
  providers: [BarsService],
})
export class BarsModule {}
