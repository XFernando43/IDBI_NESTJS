import { Module } from '@nestjs/common';
import { IncidentService } from '../Application/Service/incident.service';
import { IncidentController } from '../Application/Controller/incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../Domain/Entities/incident.entity';
import { UserModule } from 'src/Authentication-Managment/Infracstruture/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Incident]), UserModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
