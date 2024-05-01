import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTypeDto } from '../../Domain/Dto/create-user-type.dto';
import { UpdateUserTypeDto } from '../../Domain/Dto/update-user-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/Authentication-Managment/Domain/Entities/user-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTypesService {
  constructor(@InjectRepository(UserType) private userTypeRepository:Repository<UserType>){}
  async create(newUserType: CreateUserTypeDto) {
    console.log(newUserType);
    const nuevo = this.userTypeRepository.create(newUserType);
    return await this.userTypeRepository.save(nuevo);
  }

  findAll() {
    return `This action returns all userTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userType`;
  }

  update(id: number, updateUserTypeDto: UpdateUserTypeDto) {
    return `This action updates a #${id} userType`;
  }

  remove(id: number) {
    return `This action removes a #${id} userType`;
  }
}
