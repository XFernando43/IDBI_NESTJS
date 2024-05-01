import { ManyToOne } from "typeorm";
import { UserType } from "./user-type.entity";

export class Customer {

    CustomerId:number;
    Name:string;
    LastName:string;
    Phone:string;

    @ManyToOne(() => UserType, userType => userType.customers)
    userType: UserType;
}
