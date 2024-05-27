/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProyecto debería crear un nuevo proyecto', async () => {
    const proyecto: ProyectoEntity = {
      id: '',
      fechaInicio: new Date('2024-05-01'),
      fechaFin: new Date('2024-06-01'),
      url: 'https://ejemplo.com',
      estudiante: null,
      propuesta: null
    };

    const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
    expect(newProyecto).toBeDefined();
    expect(newProyecto.id).toBeDefined();
    expect(newProyecto.fechaInicio).toEqual(proyecto.fechaInicio);
    expect(newProyecto.fechaFin).toEqual(proyecto.fechaFin);
    expect(newProyecto.url).toEqual(proyecto.url);

    // Verificar que el proyecto se haya guardado en la base de datos
    const storedProyecto: ProyectoEntity = await proyectoRepository.findOne({where: {id: newProyecto.id}});
    expect(storedProyecto).toBeDefined();
    expect(storedProyecto.id).toEqual(newProyecto.id);
    expect(storedProyecto.fechaInicio).toEqual(proyecto.fechaInicio);
    expect(storedProyecto.fechaFin).toEqual(proyecto.fechaFin);
    expect(storedProyecto.url).toEqual(proyecto.url);
  });

  it('crearProyecto debería lanzar una excepción para una fecha de inicio posterior a la fecha de fin', async () => {
    const proyecto: ProyectoEntity = {
      id: '',
      fechaInicio: new Date('2024-06-01'),
      fechaFin: new Date('2024-05-01'),
      url: 'https://ejemplo.com',
      estudiante: null,
      propuesta: null
    };

    await expect(() => service.crearProyecto(proyecto)).rejects.toHaveProperty("message","fecha invalida");
  });
});
