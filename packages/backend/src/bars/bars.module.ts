import { Module } from '@nestjs/common';
import { BarsService } from './bars.service';
import { BarsController } from './bars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bar, BarSchema } from './entities/bar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bar.name,
        schema: BarSchema,
      },
    ]),
  ],
  controllers: [BarsController],
  providers: [BarsService],
})
export class BarsModule {}
