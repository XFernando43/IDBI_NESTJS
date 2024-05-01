import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Accounts")
export class Account {

    constructor(email:string, password:string, user:User){
        this.email=email;
        this.password=password;
        this.user=user;
    }

    @PrimaryGeneratedColumn()
    accountId:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToOne(()=> User)
    @JoinColumn({name:'userId'})
    user:User;

}
