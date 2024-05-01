import { ApiProperty } from '@nestjs/swagger';

export class createImgDto {


  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  imageUrl: string;

}
