import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../Domain/Dto/User/create-user.dto';
import { UpdateUserDto } from '../../Domain/Dto/User/update-user.dto';
import { User } from 'src/Authentication-Managment/Domain/Entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypesService } from './user-types.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepository:Repository<User>,private TypeUserService:UserTypesService){}
  async create(createUserDto: CreateUserDto) {
    try{
      const userFinded = await this.UserRepository.findOne({
        where:{
          name: createUserDto.name
        }
      })
      
      if(userFinded){
        throw new HttpException(
          { status: HttpStatus.CONFLICT, message: 'this user already exist' },
          HttpStatus.CONFLICT,
        );
      }
      const typeUserDB = await this.TypeUserService.findOne(createUserDto.typeId);
      if(!typeUserDB){
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'this type of user is not exist' },
          HttpStatus.NOT_FOUND,
        );
      }
      let newUser = new User(createUserDto.name,createUserDto.lastName,createUserDto.phone,typeUserDB);
      const newUserToDB = await this.UserRepository.create(newUser);
      return await this.UserRepository.save(newUserToDB);

    } catch(error){
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Error to create this user',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll() {
    // try {
      const users = await this.UserRepository.find({relations:["userType"]});
      // console.log(users);
      // if(!users || users.length === 0){
      //   throw new HttpException({status: HttpStatus.NOT_FOUND, message: 'Not users already' },HttpStatus.NOT_FOUND,);
      // }
      return users;
    // } catch (error) {
    //   throw new HttpException({status: HttpStatus.CONFLICT,message: 'Error to searching users',},HttpStatus.CONFLICT,);
    // }
  }

  async findOne(id: number) {
    try {
      const user = await this.UserRepository.findOne({where:{userId:id}});
      if (!user) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,message: 'user not found',},HttpStatus.NOT_FOUND,);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error retrieving user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.UserRepository.findOne({where:{userId:id}});
      if (!user) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,message: 'user not found',},HttpStatus.NOT_FOUND,);
      }

      const typeUserDB = await this.TypeUserService.findOne(updateUserDto.typeId);
      if(!typeUserDB){
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'this type of user is not exist' },
          HttpStatus.NOT_FOUND,
        );
      }

      let newUser = new User(updateUserDto.name,updateUserDto.lastName,updateUserDto.phone,typeUserDB);
      await this.UserRepository.update(id,newUser);
      return newUser;      
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.UserRepository.findOne({where:{userId:id}});
      if (!user) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,message: 'user not found',},HttpStatus.NOT_FOUND,);
      }
      await this.UserRepository.remove(user);
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
