import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserTypeDto {
    @IsNotEmpty({message:"Description don't should be empty"})
    @ApiProperty()
    name:string;

    @IsNotEmpty({message:"Description don't should be empty"})
    @MinLength(5,{message:"Min size is 30 characters"})
    @ApiProperty()
    description:string;
}
