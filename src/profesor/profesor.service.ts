/* eslint-disable prettier/prettier */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>,
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
    
    async eliminarProfesorId(profesorId: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id: profesorId}, relations: ["propuestas"]});
        if (!profesor)
            throw new BusinessLogicException("La profesor con el id proporcionado no fue encontrada", BusinessError.NOT_FOUND);
        if(profesor.propuestas.length==0){
            await this.profesorRepository.remove(profesor);    
            return; 
        }
        for(const x in profesor.propuestas){
            const propuestaId = profesor.propuestas[x].id;
            const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: propuestaId}, relations: ["proyecto"]});
            if(propuesta.proyecto != null){
                throw new BusinessLogicException("No se puede eliminar el profesor porque tiene propuestas con proyectos asociados", BusinessError.PRECONDITION_FAILED);
            }
        }
        await this.profesorRepository.remove(profesor);
    }
    async eliminarProfesorCedula(cedulaP: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {cedula: cedulaP}, relations: ["propuestas"]});
        if (!profesor)
          throw new BusinessLogicException("La profesor con el id proporcionado no fue encontrada", BusinessError.NOT_FOUND);
        if(profesor.propuestas.length==0){
            await this.profesorRepository.remove(profesor);    
            return; 
        }
        for(const x in profesor.propuestas){
            const propuestaId = profesor.propuestas[x].id;
            const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id: propuestaId}, relations: ["proyecto"]});
            if(propuesta.proyecto != null){
                throw new BusinessLogicException("No se puede eliminar el profesor porque tiene propuestas con proyectos asociados", BusinessError.PRECONDITION_FAILED);
            }
        }
        await this.profesorRepository.remove(profesor);
    }
 
}
