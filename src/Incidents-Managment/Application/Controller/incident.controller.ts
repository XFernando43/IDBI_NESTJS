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
} from '@nestjs/common';
import { IncidentService } from '../Service/incident.service';
import { CreateIncidentDto } from '../../Domain/Dto/Inicident/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/Inicident/update-incident.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { renameImage } from 'src/Incidents-Managment/Helpers/images.helper';


@ApiTags('Incident')
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'Create new incident',
  //   type: CreateIncidentDto,
  // })
  // @UseInterceptors(FileInterceptor('imageUrl'))
  // create(@Body() createIncidentDto: CreateIncidentDto) {
  //   return this.incidentService.create(createIncidentDto);
  // }

  @Post('IMG')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create new incident',
    type: CreateIncidentDto,
  })
  // @UseInterceptors(FileInterceptor('imageUrl', { storage: diskStorage({  destination: './uploads',  filename:renameImage}) }))
  @UseInterceptors(FileInterceptor('imageUrl'))
  createIMg(@UploadedFile() file, @Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentService.createimg(file, createIncidentDto);
  }

  @Get()
  findAll() {
    return this.incidentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
