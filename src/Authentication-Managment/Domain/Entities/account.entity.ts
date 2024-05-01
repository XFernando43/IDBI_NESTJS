import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Accounts")
export class Account {
    @PrimaryGeneratedColumn()
    AccountId:number;

    @Column()
    email:string;

    @Column()
    password:string;

    // @OneToOne(()=> User)
    // @JoinColumn({name:'UserId'})
    // user:User;

}
