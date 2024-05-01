import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export class UserType {

    @PrimaryGeneratedColumn()
    UserTypeId:number;

    @Column()
    Name:string;

    @Column()
    Description:string;

    @OneToMany(() => User, user => user.userType)
    users: User[];
    

}
