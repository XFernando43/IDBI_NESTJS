import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from 'src/Authentication-Managment/Domain/Dto/Account/create-account.dto';
import { AccountService } from '../Services/account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogginAccountDto } from 'src/Authentication-Managment/Domain/Dto/Account/loggin-account.dto';
import { Roles } from 'src/Authentication-Managment/Decorator/role.decorator';
import { Role } from 'src/Authentication-Managment/Domain/enum/roles.enum';
import { RolesGuard } from 'src/Authentication-Managment/Guards/roles.guard';

@ApiBearerAuth()
@ApiTags("Account")
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post("/register")
  // @Roles(Role.User)
  // @UseGuards(RolesGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }

  @Post("Loggin")
  Login(@Body() logginAccountDto:LogginAccountDto){
    return this.accountService.Login(logginAccountDto);
  }

}
