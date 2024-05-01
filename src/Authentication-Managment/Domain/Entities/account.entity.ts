import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Accounts")
export class Account {
    @PrimaryGeneratedColumn()
    accountId:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToOne(()=> User)
    @JoinColumn({name:'UserId'})
    user:User;

}
