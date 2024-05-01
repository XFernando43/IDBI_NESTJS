import { Module } from '@nestjs/common';
import { AccountController } from '../Application/Controllers/account.controller';
import { AccountService } from '../Application/Services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
