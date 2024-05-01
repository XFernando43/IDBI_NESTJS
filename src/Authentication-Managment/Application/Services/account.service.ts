import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from 'src/Authentication-Managment/Domain/Dto/create-account.dto';
import { UpdateAccountDto } from 'src/Authentication-Managment/Domain/Dto/update-account.dto';
import { Account } from 'src/Authentication-Managment/Domain/Entities/account.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/Authentication-Managment/Domain/Dto/create-user.dto';



@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private AccountRepository:Repository<Account>,
              private UserService:UserService){}
  async create(createAccountDto: CreateAccountDto) {
    try {
      const accountFinded = await this.AccountRepository.findOne({
        where: { email: createAccountDto.email },
      });

      if(accountFinded){
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Account with this email exist alredy',
          },
          HttpStatus.CONFLICT,
        );
      }
      
      const newUserDto = new CreateUserDto(createAccountDto.name,createAccountDto.lastName,createAccountDto.phone,createAccountDto.typeId);
      let newUser = await this.UserService.create(newUserDto);

      const passwordCrypted = await hash(createAccountDto.password,10);
      const newAccount = new Account(createAccountDto.email,passwordCrypted,newUser);

      const saveAccount = await this.AccountRepository.create(newAccount);
      return await this.AccountRepository.save(saveAccount);

    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Error to create this Account',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
























