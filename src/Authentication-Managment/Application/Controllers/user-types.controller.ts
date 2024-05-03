import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserTypesService } from '../Services/user-types.service';
import { CreateUserTypeDto } from '../../Domain/Dto/TypeUser/create-user-type.dto';
import { UpdateUserTypeDto } from '../../Domain/Dto/TypeUser/update-user-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { Roles } from 'src/Authentication-Managment/Decorator/role.decorator';
import { RolesGuard } from 'src/Authentication-Managment/Guards/roles.guard';
import { Role } from 'src/Authentication-Managment/Domain/enum/roles.enum';

@ApiTags("UserTypes")
@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserTypeDto: CreateUserTypeDto) {
    return this.userTypesService.create(createUserTypeDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.userTypesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.userTypesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserTypeDto: UpdateUserTypeDto) {
    return this.userTypesService.update(+id, updateUserTypeDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.userTypesService.remove(+id);
  }
}
