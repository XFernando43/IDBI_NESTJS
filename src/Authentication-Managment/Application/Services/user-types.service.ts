import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTypeDto } from '../../Domain/Dto/create-user-type.dto';
import { UpdateUserTypeDto } from '../../Domain/Dto/update-user-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/Authentication-Managment/Domain/Entities/user-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}
  async create(newUserType: CreateUserTypeDto) {
    try {
      const typeFinded = await this.userTypeRepository.findOne({
        where: {
          name: newUserType.name,
        },
      });

      if (typeFinded) {
        throw new HttpException(
          { status: HttpStatus.CONFLICT, message: 'this user already exist' },
          HttpStatus.CONFLICT,
        );
      }

      const nuevo = this.userTypeRepository.create(newUserType);
      return await this.userTypeRepository.save(nuevo);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Error to create this type of user',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll() {
    try {
      const userTypes = await this.userTypeRepository.find();
      return userTypes;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Error to load all user types ',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const typeuser = await this.userTypeRepository.findOne({
        where: {
          typeId: id,
        },
      });
      if (!typeuser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User type not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return typeuser;

    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error finding user type',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserTypeDto: UpdateUserTypeDto) {
    try {
      const typeToUpdate = await this.userTypeRepository.findOne({
        where: { typeId: id },
      });

      if (!typeToUpdate) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User type not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      this.userTypeRepository.merge(typeToUpdate, updateUserTypeDto);
      return await this.userTypeRepository.save(typeToUpdate);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error updating user type',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const typeToDelete = await this.userTypeRepository.findOne({
        where: { typeId: id },
      });

      if (!typeToDelete) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User type not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.userTypeRepository.remove(typeToDelete);
      return { message: 'User type deleted successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error deleting user type',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
