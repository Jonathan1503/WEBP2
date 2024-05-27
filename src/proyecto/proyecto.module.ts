/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { PropuestaService } from 'src/propuesta/propuesta.service';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';


@Module({
  providers: [ProyectoService,PropuestaService],
  controllers: [ProyectoController],
  imports: [TypeOrmModule.forFeature([ProyectoEntity,PropuestaEntity])],
})
export class ProyectoModule {}
