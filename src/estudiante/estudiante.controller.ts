/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}
  
    @Get(':estudianteId')
    async findEstudianteById(@Param('estudianteId') estudianteId: string) {
      return await this.estudianteService.findEstudianteById(estudianteId);
    }
  
    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
      const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
      return await this.estudianteService.crearEstudiante(estudiante);
    }

}
