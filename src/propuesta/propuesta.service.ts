/* eslint-disable prettier/prettier */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRespository: Repository<PropuestaEntity>
    ){}
   
    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRespository.findOne({where: {id}} );
        if (!propuesta)
          throw new BusinessLogicException("El propuesta con el id proporcionado no fue encontrado", BusinessError.NOT_FOUND);
   
        return propuesta;
    }
    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
     
        return await this.propuestaRespository.save(propuesta);
    }
    
 
}
