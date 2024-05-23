/* eslint-disable prettier/prettier */
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 cedula: number;
 
 @Column()
 grupoInvestigacion: string;

 @Column()
 numeroExtension: number;

 @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
 propuestas: PropuestaEntity[];
}