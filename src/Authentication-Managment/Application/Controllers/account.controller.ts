import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from 'src/Authentication-Managment/Domain/Dto/Account/create-account.dto';
import { AccountService } from '../Services/account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogginAccountDto } from 'src/Authentication-Managment/Domain/Dto/Account/loggin-account.dto';
import { JwtAuthGuard } from 'src/Authentication-Managment/Guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags("Account")
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }

  @Post("Loggin")
  Login(@Body() logginAccountDto:LogginAccountDto){
    return this.accountService.Login(logginAccountDto);
  }

}
