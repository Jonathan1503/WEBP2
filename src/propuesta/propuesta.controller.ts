/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { PropuestaService } from './propuesta.service';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}
    @Get()
    async findAllPropuesta() {
      return await this.propuestaService.findAllPropuesta();
    }
  
    @Get(':propuestaId')
    async findPropuestaById(@Param('propuestaId') propuestaId: string) {
      return await this.propuestaService.findPropuestaById(propuestaId);
    }
  
    @Post()
    async crearPropuesta(@Body() propuestaDto: PropuestaDto) {
      const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, propuestaDto);
      return await this.propuestaService.crearPropuesta(propuesta);
    }
  
    @Delete(':propuestaId')
    @HttpCode(204)
    async delete(@Param('propuestaId') propuestaId: string) {
      return await this.propuestaService.deletePropuesta(propuestaId);
    }
}
