import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { CreateUserDto } from 'src/Authentication-Managment/Domain/Dto/User/create-user.dto';
import { UpdateUserDto } from 'src/Authentication-Managment/Domain/Dto/User/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Authentication-Managment/Decorator/role.decorator';
import { Role } from 'src/Authentication-Managment/Domain/enum/roles.enum';
import { RolesGuard } from 'src/Authentication-Managment/Guards/roles.guard';
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
