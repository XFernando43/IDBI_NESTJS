import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  subject: string;
    
  @ApiProperty()
  type: string;
  @ApiProperty()
  details: string;
  @ApiProperty()
  status: string;

  // @ApiProperty()
  imageUrlText: string;


  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  imageUrl: string;

}
