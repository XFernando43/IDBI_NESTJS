import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

export class UserType {

    @PrimaryGeneratedColumn()
    UserTypeId:number;

    @Column()
    Name:string;

    @Column()
    Description:string;

    @OneToMany(() => Customer, customer => customer.userType)
    customers: Customer[];
    

}
