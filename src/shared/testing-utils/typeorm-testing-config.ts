/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, ProfesorEntity, ProyectoEntity, PropuestaEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([EstudianteEntity, ProfesorEntity, ProyectoEntity, PropuestaEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/