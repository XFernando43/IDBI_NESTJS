import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../Domain/Dto/create-user.dto';
import { UpdateUserDto } from '../../Domain/Dto/update-user.dto';
import { User } from 'src/Authentication-Managment/Domain/Entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepository:Repository<User>){}
  create(createUserDto: CreateUserDto) {
    // const newUSer = this.UserRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
