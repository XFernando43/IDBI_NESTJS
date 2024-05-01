import { Module } from '@nestjs/common';
import { IncidentService } from '../Application/Service/incident.service';
import { IncidentController } from '../Application/Controller/incident.controller';

@Module({
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
