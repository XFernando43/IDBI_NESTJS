import { User } from "src/Authentication-Managment/Domain/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./incident.entity";

@Entity("Comments")
export class Comment {
    @PrimaryGeneratedColumn()
    commentId:number;
    
    @ManyToOne(()=> Incident, incident => incident.comments)
    @JoinColumn({name:"incidentID"})
    incident:Incident;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name:"userId"})
    user: User;

    @Column()
    content:string;

    @JoinColumn()
    createdAt: Date;
}
