import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Module({
  providers: [EstudianteService],
  controllers: [EstudianteController],
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
})
export class EstudianteModule {}
