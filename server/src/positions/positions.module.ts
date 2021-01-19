import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsResolver } from './positions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [PositionsService, PositionsResolver],
  exports: [PositionsService],
})
export class PositionsModule {}
