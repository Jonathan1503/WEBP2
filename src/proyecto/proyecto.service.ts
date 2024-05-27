/* eslint-disable prettier/prettier */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}
   
    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if(proyecto.fechaFin<proyecto.fechaInicio)
            throw new BusinessLogicException("fecha invalida", BusinessError.PRECONDITION_FAILED);
        return await this.proyectoRepository.save(proyecto);
    }
    
 
}
