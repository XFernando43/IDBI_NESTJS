import { ManyToOne } from "typeorm";
import { UserType } from "./user-type.entity";

export class User {

    UserId:number;
    Name:string;
    LastName:string;
    Phone:string;

    @ManyToOne(() => UserType, userType => userType.users)
    userType: UserType;
}
