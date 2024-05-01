import { Module } from '@nestjs/common';
import { UserController } from '../Application/Controllers/user.controller';
import { UserService } from '../Application/Services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/Entities/user.entity';
import { UserTypesModule } from './user-types.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UserTypesModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
