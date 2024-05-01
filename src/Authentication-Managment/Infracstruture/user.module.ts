import { Module } from '@nestjs/common';
import { UserController } from '../Application/Controllers/user.controller';
import { UserService } from '../Application/Services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/Entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
