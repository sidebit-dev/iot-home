import { Test, TestingModule } from '@nestjs/testing';
import { SensorLogService } from './sensor_log.service';

describe('SensorLogService', () => {
  let service: SensorLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorLogService],
    }).compile();

    service = module.get<SensorLogService>(SensorLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
