import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("UserTypes")
export class UserType {

    @PrimaryGeneratedColumn()
    typeId:number;
    
    @Column()
    name:string;

    @Column()
    description:string;

    @OneToMany(() => User, (user)=> user.userType)
    users: User[];
    

}
