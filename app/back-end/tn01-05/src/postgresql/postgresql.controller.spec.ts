import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlController } from './postgresql.controller';

describe('PostgresqlController', () => {
  let controller: PostgresqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostgresqlController],
    }).compile();

    controller = module.get<PostgresqlController>(PostgresqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
