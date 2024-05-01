import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity("Accounts")
export class Account {
    @PrimaryGeneratedColumn()
    AccountId:number;

    @Column()
    Email:string;

    @Column()
    Password:string;

    // @OneToOne(()=> User)
    // @JoinColumn({name:'UserId'})
    // user:User;

    @OneToOne(()=> Customer)
    @JoinColumn({name:'UserId'})
    user:Customer;

}
