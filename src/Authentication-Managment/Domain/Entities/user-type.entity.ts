import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("UserTypes")
export class UserType {

    @PrimaryGeneratedColumn()
    TypeId:number;

    @Column()
    Name:string;

    @Column()
    Description:string;

    @OneToMany(() => User, user => user.userType)
    users: User[];
    

}
