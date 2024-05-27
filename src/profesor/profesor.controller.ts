/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity/profesor.entity';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}
  
    @Get(':profesorId')
    async findProfesorById(@Param('profesorId') profesorId: string) {
      return await this.profesorService.findProfesorById(profesorId);
    }
  
    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
      const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
      return await this.profesorService.crearProfesor(profesor);
    }
  
    @Delete(':profesorId')
    @HttpCode(204)
    async eliminarProfesorId(@Param('profesorId') profesorId: string) {
      return await this.profesorService.eliminarProfesorId(profesorId);
    }
    @Delete(':cedula')
    @HttpCode(204)
    async eliminarProfesorCedula(@Param('cedula') cedula: number) {
      return await this.profesorService.eliminarProfesorCedula(cedula);
    }
}
