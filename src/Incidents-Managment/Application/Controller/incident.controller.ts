import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentService } from '../Service/incident.service';
import { CreateIncidentDto } from '../../Domain/Dto/create-incident.dto';
import { UpdateIncidentDto } from '../../Domain/Dto/update-incident.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Incident")
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentService.create(createIncidentDto);
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
  update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
