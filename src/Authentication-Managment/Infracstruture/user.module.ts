import { Module } from '@nestjs/common';
import { UserController } from '../Application/Controllers/user.controller';
import { UserService } from '../Application/Services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
