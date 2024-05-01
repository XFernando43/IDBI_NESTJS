import { Module } from '@nestjs/common';
import { IncidentService } from '../Application/Service/incident.service';
import { IncidentController } from '../Application/Controller/incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../Domain/Entities/incident.entity';
import { UserModule } from 'src/Authentication-Managment/Infracstruture/user.module';
import { FirebaseModule } from './firebase.module';

@Module({
  imports:[TypeOrmModule.forFeature([Incident]), 
  UserModule, FirebaseModule
  
  ],
  controllers: [IncidentController],
  providers: [IncidentService],
  exports:[IncidentService],
})
export class IncidentModule {}
