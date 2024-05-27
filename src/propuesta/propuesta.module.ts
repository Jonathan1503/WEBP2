/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { ProyectoService } from 'src/proyecto/proyecto.service';

@Module({
  providers: [PropuestaService,ProyectoService],
  controllers: [PropuestaController],
  imports: [TypeOrmModule.forFeature([PropuestaEntity,ProyectoEntity])],
})
export class PropuestaModule {}
