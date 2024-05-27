/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';

@Module({
  imports: [EstudianteModule, ProfesorModule, PropuestaModule, ProyectoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [EstudianteEntity, ProfesorEntity, PropuestaEntity, ProyectoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
