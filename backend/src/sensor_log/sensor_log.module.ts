import { Module } from '@nestjs/common';
import { SensorLogController } from './sensor_log.controller';
import { SensorLogService } from './sensor_log.service';

@Module({
  controllers: [SensorLogController],
  providers: [SensorLogService]
})
export class SensorLogModule {}
