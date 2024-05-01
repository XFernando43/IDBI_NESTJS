import { ApiProperty } from '@nestjs/swagger';

export class UpdateIncidentDto {
  @ApiProperty()
  subject: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  details: string;
  @ApiProperty()
  status: string;
}
