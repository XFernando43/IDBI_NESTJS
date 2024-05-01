import { Module } from '@nestjs/common';
import { AccountController } from '../Application/Controllers/account.controller';
import { AccountService } from '../Application/Services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../Domain/Entities/account.entity';
import { UserModule } from './user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Account]),
    UserModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
