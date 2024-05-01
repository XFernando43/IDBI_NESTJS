import { Module } from '@nestjs/common';
import { AccountController } from '../Application/Controllers/account.controller';
import { AccountService } from '../Application/Services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../Domain/Entities/account.entity';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Account]),
    UserModule,
    JwtModule.register({
      global:true,
      secret: "TUNOMETECABRASARANBANBINCHE2024",
      signOptions:{expiresIn:'2h'},
    })
  ],
  
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
