/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let propuestaRepository: Repository<PropuestaEntity>;
  let profesorRepository: Repository<ProfesorEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let propuestasList: PropuestaEntity[];
  let profesoresList: ProfesorEntity[];
  let proyectosList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    propuestaRepository.clear();
    profesorRepository.clear();
    proyectoRepository.clear();

    propuestasList = [];
    profesoresList = [];
    proyectosList = [];

    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await profesorRepository.save({
        nombre: faker.name.firstName(),
        cedula: faker.datatype.number(),
        grupoInvestigacion: 'TICSW',
        numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      });
      profesoresList.push(profesor);
    }

    for (let i = 0; i < 5; i++) {
      const proyecto: ProyectoEntity = await proyectoRepository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        url: faker.internet.url(),
      });
      proyectosList.push(proyecto);
    }

    for (let i = 0; i < 5; i++) {
      const propuesta: PropuestaEntity = await propuestaRepository.save({
        titulo: faker.company.name(),
        descripcion: faker.company.catchPhrase(),
        palabraClave: faker.random.word(),
      });
      propuestasList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findPropuestaById debería devolver una propuesta por id', async () => {
    const storedPropuesta: PropuestaEntity = propuestasList[0];
    const propuesta: PropuestaEntity = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo);
    expect(propuesta.descripcion).toEqual(storedPropuesta.descripcion);
    expect(propuesta.palabraClave).toEqual(storedPropuesta.palabraClave);
    expect(propuesta.proyecto).toEqual(storedPropuesta.proyecto);
    expect(propuesta.profesor).toEqual(storedPropuesta.profesor);
  });

  it('findPropuestaById debería lanzar una excepción para una propuesta no válida', async () => {
    await expect(() => service.findPropuestaById("0")).rejects.toHaveProperty("message", "El propuesta con el id proporcionado no fue encontrado");
  });

  it('crearPropuesta debería devolver una nueva propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: faker.company.name(),
      descripcion: faker.company.catchPhrase(),
      palabraClave: faker.random.word(),
      proyecto: null,
      profesor: null,
    };

    const newPropuesta: PropuestaEntity = await service.crearPropuesta(propuesta);
    expect(newPropuesta).not.toBeNull();

    const storedPropuesta: PropuestaEntity = await propuestaRepository.findOne({ where: { id: newPropuesta.id } });
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo);
    expect(storedPropuesta.descripcion).toEqual(newPropuesta.descripcion);
    expect(storedPropuesta.palabraClave).toEqual(newPropuesta.palabraClave);
  });

  it('crearPropuesta debería lanzar una excepción para una propuesta sin título', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: "",
      descripcion: faker.company.catchPhrase(),
      palabraClave: faker.random.word(),
      proyecto:null,
      profesor: null
    };

    await expect(() => service.crearPropuesta(propuesta)).rejects.toHaveProperty("message", "No se puede crear propuesta con titulo vacio");
  });

  it('findAllPropuesta debería devolver todas las propuestas', async () => {
    const propuestas: PropuestaEntity[] = await service.findAllPropuesta();
    expect(propuestas).toHaveLength(propuestasList.length);
  });

  it('deletePropuesta debería eliminar una propuesta', async () => {
    const propuesta: PropuestaEntity = propuestasList[0];
    await service.deletePropuesta(propuesta.id);
    const deletedPropuesta: PropuestaEntity = await propuestaRepository.findOne({ where: { id: propuesta.id } });
    expect(deletedPropuesta).toBeNull();
  });

  it('deletePropuesta debería lanzar una excepción para una propuesta no válida', async () => {
    await expect(() => service.deletePropuesta("0")).rejects.toHaveProperty("message", "La propuesta con el id proporcionado no fue encontrada");
  });

});
