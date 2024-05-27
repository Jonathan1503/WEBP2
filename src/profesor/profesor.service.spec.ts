/* eslint-disable prettier/prettier */
/* archivo src/profesor/profesor.service.spec.ts */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';


describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepository: Repository<ProfesorEntity>;
  let propuestaRepository: Repository<PropuestaEntity>;
  let profesoresList: ProfesorEntity[];
  let propuestasList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    propuestaRepository.clear();
    profesorRepository.clear();

    propuestasList = [];
    profesoresList = [];

    for (let i = 0; i < 5; i++) {
      const propuesta: PropuestaEntity = await propuestaRepository.save({
        titulo: faker.company.name(),
        descripcion: faker.company.name(),
        palabraClave: faker.company.name(),
        proyecto: null,
      });
      propuestasList.push(propuesta);
    }

    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await profesorRepository.save({
        nombre: faker.name.firstName(),
        cedula: faker.datatype.number(),
        grupoInvestigacion: 'TICSW',
        numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
        propuestas: propuestasList.slice(0, 2), // Asignamos algunas propuestas a cada profesor
      });
      profesoresList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findProfesorById debería devolver un profesor por id', async () => {
    const storedProfesor: ProfesorEntity = profesoresList[0];
    const profesor: ProfesorEntity = await service.findProfesorById(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.nombre).toEqual(storedProfesor.nombre);
    expect(profesor.cedula).toEqual(storedProfesor.cedula);
    expect(profesor.grupoInvestigacion).toEqual(storedProfesor.grupoInvestigacion);
    expect(profesor.numeroExtension).toEqual(storedProfesor.numeroExtension);
  });

  it('findProfesorById debería lanzar una excepción para un profesor no válido', async () => {
    await expect(() => service.findProfesorById("0")).rejects.toHaveProperty("message", "El profesor con el id proporcionado no fue encontrada");
  });

  it('crearProfesor debería devolver un nuevo profesor', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      nombre: faker.name.firstName(),
      cedula: faker.datatype.number(),
      grupoInvestigacion: "TICSW",
      numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      propuestas: [],
    };

    const newProfesor: ProfesorEntity = await service.crearProfesor(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await profesorRepository.findOne({ where: { id: newProfesor.id } });
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.nombre).toEqual(newProfesor.nombre);
    expect(storedProfesor.cedula).toEqual(newProfesor.cedula);
    expect(storedProfesor.grupoInvestigacion).toEqual(newProfesor.grupoInvestigacion);
    expect(storedProfesor.numeroExtension).toEqual(newProfesor.numeroExtension);
  });

  it('crearProfesor debería lanzar una excepción para un grupo de investigación no válido', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      nombre: faker.name.firstName(),
      cedula: faker.datatype.number(),
      grupoInvestigacion: "INVALID_GROUP",
      numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      propuestas: [],
    };

    await expect(() => service.crearProfesor(profesor)).rejects.toHaveProperty("message", "Grupo invalido");
  });

  it('eliminarProfesorId debería eliminar un profesor', async () => {
    const profesor: ProfesorEntity = profesoresList[0];
    profesor.propuestas = [];
    await profesorRepository.save(profesor);

    await service.eliminarProfesorId(profesor.id);
    const deletedProfesor: ProfesorEntity = await profesorRepository.findOne({ where: { id: profesor.id } });
    expect(deletedProfesor).toBeNull();
  });

  it('eliminarProfesorId debería lanzar una excepción para un profesor no válido', async () => {
    await expect(() => service.eliminarProfesorId("0")).rejects.toHaveProperty("message", "La profesor con el id proporcionado no fue encontrada");
  });

  
  it('eliminarProfesorCedula debería eliminar un profesor por cedula', async () => {
    const profesor: ProfesorEntity = profesoresList[2];
    profesor.propuestas = [];
    await profesorRepository.save(profesor);

    await service.eliminarProfesorCedula(profesor.cedula);
    const deletedProfesor: ProfesorEntity = await profesorRepository.findOne({ where: { cedula: profesor.cedula } });
    expect(deletedProfesor).toBeNull();
  });

  it('eliminarProfesorCedula debería lanzar una excepción para un profesor no válido', async () => {
    await expect(() => service.eliminarProfesorCedula(0)).rejects.toHaveProperty("message", "La profesor con el id proporcionado no fue encontrada");
  });

  
});
