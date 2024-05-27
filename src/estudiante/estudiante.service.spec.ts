/* eslint-disable prettier/prettier */
/* archivo src/estudiante/estudiante.service.spec.ts */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';


describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.name.firstName(),
        codigo: faker.random.alphaNumeric(10),
        creditosAprovados:faker.number.int(),
      });
      estudiantesList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findEstudianteById debería devolver un estudiante por id', async () => {
    const storedEstudiante: EstudianteEntity = estudiantesList[0];
    const estudiante: EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
    expect(estudiante.codigo).toEqual(storedEstudiante.codigo);
    expect(estudiante.creditosAprovados).toEqual(storedEstudiante.creditosAprovados);
  });

  it('findEstudianteById debería lanzar una excepción para un estudiante no válido', async () => {
    await expect(() => service.findEstudianteById("0")).rejects.toHaveProperty("message", "El estudiante con el id proporcionado no fue encontrado");
  });

  it('crearEstudiante debería devolver un nuevo estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.name.firstName(),
      codigo: faker.random.alphaNumeric(10),
      creditosAprovados: faker.number.int(),
      proyecto: null
    };

    const newEstudiante: EstudianteEntity = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante: EstudianteEntity = await repository.findOne({ where: { id: newEstudiante.id } });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.nombre).toEqual(newEstudiante.nombre);
    expect(storedEstudiante.codigo).toEqual(newEstudiante.codigo);
    expect(storedEstudiante.creditosAprovados).toEqual(newEstudiante.creditosAprovados);
  });

  it('crearEstudiante debería lanzar una excepción para un código no válido', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.name.firstName(),
      codigo: "1234",
      creditosAprovados: faker.number.int(),
      proyecto: null
    };

    await expect(() => service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", "Codigo invalido");
  });
});
