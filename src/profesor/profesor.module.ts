/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { PropuestaService } from 'src/propuesta/propuesta.service';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';

@Module({
  providers: [ProfesorService,PropuestaService],
  controllers: [ProfesorController],
  imports: [TypeOrmModule.forFeature([ProfesorEntity,PropuestaEntity])],
})
export class ProfesorModule {}
