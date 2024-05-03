import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from '../Service/incident.service';
import { CreateIncidentDto } from '../../Domain/Dto/Inicident/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/Inicident/update-incident.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { renameImage } from 'src/Incidents-Managment/Helpers/images.helper';
import { createImgDto } from 'src/Incidents-Managment/Domain/Dto/Inicident/create-img.dto';
import { Roles } from 'src/Authentication-Managment/Decorator/role.decorator';
import { Role } from 'src/Authentication-Managment/Domain/enum/roles.enum';
import { RolesGuard } from 'src/Authentication-Managment/Guards/roles.guard';


@ApiTags('Incident')
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create new incident',
    type: CreateIncidentDto,

  })
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@UploadedFile() file, @Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentService.create(file, createIncidentDto);
  }

  @Post('IMG')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'submit a image from the incident',
    type: createImgDto,
  })
  @UseInterceptors(FileInterceptor('imageUrl'))
  createIMg(@UploadedFile() file) {
    return this.incidentService.createimg(file);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  findAll() {
    return this.incidentService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.incidentService.findOne(+id);
  }
  @Get('GetIncidentById/:userId')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  findIncidentsByUser(@Param('userId') id: string) {
    return this.incidentService.findIncidebntByUser(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
