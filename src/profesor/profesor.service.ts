/* eslint-disable prettier/prettier */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { ProfesorEntity } from './profesor.entity/profesor.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}
   
    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}} );
        if (!profesor)
          throw new BusinessLogicException("El profesor con el id proporcionado no fue encontrada", BusinessError.NOT_FOUND);
   
        return profesor;
    }
    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        const grupo= profesor.grupoInvestigacion
        if(![ "TICSW", "IMAGINE", "COMIT"].includes(grupo))
            throw new BusinessLogicException("Grupo invalido", BusinessError.PRECONDITION_FAILED);
        return await this.profesorRepository.save(profesor);
    }
    
    async eliminarProfesorId(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
        if (!profesor)
          throw new BusinessLogicException("La profesor con el id proporcionado no fue encontrada", BusinessError.NOT_FOUND);
    
        await this.profesorRepository.remove(profesor);
    }
    async eliminarProfesorCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
        if (!profesor)
          throw new BusinessLogicException("La profesor con la cedula proporcionado no fue encontrada", BusinessError.NOT_FOUND);
    
        await this.profesorRepository.remove(profesor);
    }
 
}
