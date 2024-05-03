import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from '../../Domain/Dto/Inicident/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/Inicident/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from 'src/Incidents-Managment/Domain/Entities/incident.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/Authentication-Managment/Application/Services/user.service';

// correos
import { transporter } from 'config/mailer';
import { FirebaseService } from './firebase.service';



@Injectable()
export class IncidentService {
  constructor(@InjectRepository(Incident) private IncidentRepository:Repository<Incident>
              ,private UserService:UserService,
              private fireBaseService:FirebaseService){}
  async create(imageFile,createIncidentDto: CreateIncidentDto) {
    try{
      const userFinded = await this.UserService.findOne(createIncidentDto.userId);

      if(!userFinded){
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const dateNow = new Date();

      const imgUrl = await this.createimg(imageFile);
      
      const newIncidentEntity = 
            new Incident(userFinded,
                        createIncidentDto.subject,
                        imgUrl,
                        createIncidentDto.type,
                        createIncidentDto.details,
                        createIncidentDto.status,
                        dateNow,dateNow);

      const newIncidentToDB = await this.IncidentRepository.create(newIncidentEntity);
      
      await transporter.sendMail({
        from: `${userFinded.name} ${userFinded.lastName}`, 
        to: "voxel63792@ociun.com", 
        subject: `${createIncidentDto.subject}`, 
        text: `${createIncidentDto.type}`, 
        html: `<b>${createIncidentDto.details}</b>`, 
      });

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


  async createimg(imageFile):Promise<string> {
    const storage = this.fireBaseService.getStorageInstance();
    const bucket = storage.bucket();

    // const fileUpload = bucket.file(imageFile.originalname)
    const fileUpload = bucket.file(`Indicents/${imageFile.originalname}`)

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype
      }
    })

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          const [url] = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '01-01-3000',
          });

          resolve(url);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(imageFile.buffer)

    });

  }


  async findAll() {
    try{
      // const Incidents = await this.IncidentRepository.find();
      const Incidents = await this.IncidentRepository.find({ relations: ['user']});

      if(!Incidents || Incidents.length <= 0){
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: 'Not Incidents in dataBase Alredy',
            data:Incidents
          },
          HttpStatus.OK,
        );
      }
      return Incidents;
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to get All Incidents',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findIncidebntByUser(userId:number) {
    try{
      const Incidents = await this.IncidentRepository.find({where:{
        user:{userId:userId}
      }});

      if(!Incidents || Incidents.length <= 0){
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: 'Este usuario no presenta incidentes',
            data:Incidents
          },
          HttpStatus.OK,
        );
      }
      return Incidents;
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to get All Incidents',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }




  async findOne(id: number) {
    try {
      const incident = await this.IncidentRepository.findOne({where:{incidentId:id},relations: ['user']});
      if (!incident) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not incident Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return incident;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error retrieving incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    try {
      const incident = await this.IncidentRepository.findOne({where:{incidentId:id}});
      if (!incident) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not incident Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      this.IncidentRepository.merge(incident, updateIncidentDto);
      return await this.IncidentRepository.save(incident);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error updating incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const incident = await this.IncidentRepository.findOne({where:{incidentId:id}});
      if (!incident) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not incident Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.IncidentRepository.remove(incident);
      return { message: `Incident with ID ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error deleting incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
