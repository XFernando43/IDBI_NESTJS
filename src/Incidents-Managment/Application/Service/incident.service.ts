import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from '../../Domain/Dto/Inicident/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/Inicident/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from 'src/Incidents-Managment/Domain/Entities/incident.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/Authentication-Managment/Application/Services/user.service';

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

import { transporter } from 'config/mailer';

// var admin = require("firebase-admin");
// var serviceAccount = require("../../../../src/keyNestJS.json");

// import { getAnalytics } from "firebase/analytics";

// import * as sharp from 'sharp';



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

      console.log('Imagen recibida:', createIncidentDto.imageUrl);

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




  async createimg(imageFile, createIncidentDto: CreateIncidentDto) {
    
      console.log('Imagen recibida:', imageFile);
  
     

      const firebaseConfig = {
        apiKey: "AIzaSyDVn_MVEaXsuv-BudMGe9_RMAoCQB0JsPw",
        authDomain: "idbi-d3fa7.firebaseapp.com",
        projectId: "idbi-d3fa7",
        storageBucket: "idbi-d3fa7.appspot.com",
        messagingSenderId: "904086420852",
        appId: "1:904086420852:web:c59ac91ca454121f69c021",
        measurementId: "G-GDMY8SFDM6"
      };

      const app = initializeApp(firebaseConfig);
      

      


      const storage = getStorage();
      const storageRef = ref(storage, imageFile.originalname);
      const metadata = {
          contentType: imageFile.mimetype,
      };

      uploadBytes(storageRef, imageFile ,metadata).then((snapshot) => {
        console.log(imageFile);
      });

      try {
        const snapshot = await uploadBytes(storageRef, imageFile, metadata);
        console.log('Archivo subido a Firebase:', imageFile.originalname);
        return snapshot;
    } catch (error) {
        console.error('Error al subir archivo a Firebase:', error);
        throw error;
    }
 
  }


  async findAll() {
    try{
      const Incidents = await this.IncidentRepository.find();
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

  async findOne(id: number) {
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
