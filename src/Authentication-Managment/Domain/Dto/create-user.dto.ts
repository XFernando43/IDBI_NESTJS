import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    constructor(name:string, lastName:string, phone:string, typeId:number){
        this.name=name;
        this.lastName=lastName;
        this.phone=phone;
        this.typeId=typeId;
    }

    @ApiProperty()
    @MinLength(5,{message:"min character for name must be 5"})
    name:string;
    @MinLength(5,{message:"min character for lastname must be 5"})
    @ApiProperty()
    lastName:string;
    @MinLength(12,{message:"min character for phone must be 5"})
    @ApiProperty()
    phone:string;
    @ApiProperty()
    @IsNotEmpty()
    typeId: number;

}
