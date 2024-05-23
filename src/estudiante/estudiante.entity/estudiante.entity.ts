/* eslint-disable prettier/prettier */
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 codigo: string;
 
 @Column()
 creditosAprovados: number;
 @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
   proyecto: ProyectoEntity;
}