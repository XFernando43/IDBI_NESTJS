import { User } from "src/Authentication-Managment/Domain/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./incident.entity";

@Entity("Comments")
export class Comment {
    @PrimaryGeneratedColumn()
    CommentId:number;
    
    @ManyToOne(()=> Incident, incident => incident.comments)
    @JoinColumn({name:"incidentID"})
    Incident:Incident;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name:"userId"})
    User: User;

    @Column()
    Content:string;

    @JoinColumn()
    CreatedAt: Date;
}
