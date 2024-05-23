/* eslint-disable prettier/prettier */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}
   
    async findEstudianteById(id: string): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}} );
        if (!estudiante)
          throw new BusinessLogicException("El estudiante con el id proporcionado no fue encontrado", BusinessError.NOT_FOUND);
   
        return estudiante;
    }
    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if(estudiante.codigo.length != 10)
            throw new BusinessLogicException("Codigo invalido", BusinessError.PRECONDITION_FAILED);
        return await this.estudianteRepository.save(estudiante);
    }
    
 
}
