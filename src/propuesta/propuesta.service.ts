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
        private readonly propuestaRespository: Repository<PropuestaEntity>,
    ){}
   
    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRespository.findOne({where: {id}} );
        if (!propuesta)
          throw new BusinessLogicException("El propuesta con el id proporcionado no fue encontrado", BusinessError.NOT_FOUND);
   
        return propuesta;
    }
    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if(propuesta.titulo.length < 1){
            throw new BusinessLogicException("No se puede crear propuesta con titulo vacio", BusinessError.PRECONDITION_FAILED);
        }
        return await this.propuestaRespository.save(propuesta);
    }
    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRespository.find();
    }
    async deletePropuesta(propuestaId: string) {
        const propuesta: PropuestaEntity = await this.propuestaRespository.findOne({where: {id: propuestaId}});
        if (!propuesta)
          throw new BusinessLogicException("La propuesta con el id proporcionado no fue encontrada", BusinessError.NOT_FOUND);
        if(propuesta.proyecto != null){
            throw new BusinessLogicException("No se puede eliminar la propuesta  porque tiene proyecto asociado", BusinessError.PRECONDITION_FAILED);
        }
        await this.propuestaRespository.remove(propuesta);
    }

 
}
