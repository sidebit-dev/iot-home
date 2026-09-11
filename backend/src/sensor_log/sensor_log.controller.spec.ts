import { Test, TestingModule } from '@nestjs/testing';
import { SensorLogController } from './sensor_log.controller';

describe('SensorLogController', () => {
  let controller: SensorLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorLogController],
    }).compile();

    controller = module.get<SensorLogController>(SensorLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
