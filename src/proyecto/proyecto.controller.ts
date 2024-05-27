/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}
  
  
    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto) {
      const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
      return await this.proyectoService.crearProyecto(proyecto);
    }

}
