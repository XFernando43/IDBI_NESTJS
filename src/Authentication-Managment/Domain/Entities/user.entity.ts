import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user-type.entity";

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    UserId:number;
    @Column()
    Name:string;
    @Column()
    LastName:string;
    @Column()
    Phone:string;

    @ManyToOne(() => UserType, userType => userType.users)
    userType: UserType;
}
