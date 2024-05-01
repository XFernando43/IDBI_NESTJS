import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTypesService } from '../Services/user-types.service';
import { CreateUserTypeDto } from '../../Domain/Dto/create-user-type.dto';
import { UpdateUserTypeDto } from '../../Domain/Dto/update-user-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @Post()
  create(@Body() createUserTypeDto: CreateUserTypeDto) {
    return this.userTypesService.create(createUserTypeDto);
  }

  @Get()
  findAll() {
    return this.userTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTypeDto: UpdateUserTypeDto) {
    return this.userTypesService.update(+id, updateUserTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTypesService.remove(+id);
  }
}
