import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from '../../Domain/Dto/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from 'src/Incidents-Managment/Domain/Entities/incident.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/Authentication-Managment/Application/Services/user.service';

@Injectable()
export class IncidentService {
  constructor(@InjectRepository(Incident) private IncidentRepository:Repository<Incident>
              ,private UserService:UserService){}
  async create(createIncidentDto: CreateIncidentDto) {
    try{
      const userFinded = await this.UserService.findOne(createIncidentDto.userId);

      const dateNow = new Date();

      if(!userFinded){
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const newIncidentEntity = 
            new Incident(userFinded,
                        createIncidentDto.subject,
                        createIncidentDto.imageUrl,
                        createIncidentDto.type,
                        createIncidentDto.details,
                        createIncidentDto.status,
                        dateNow,dateNow);


      const newIncidentToDB = await this.IncidentRepository.create(newIncidentEntity);

      return this.IncidentRepository.save(newIncidentToDB);

    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to create a new Incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all incident`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incident`;
  }

  update(id: number, updateIncidentDto: UpdateIncidentDto) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
