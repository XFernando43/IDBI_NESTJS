import { User } from "src/Authentication-Managment/Domain/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./incident.entity";

@Entity("Comments")
export class Comment {

    constructor(incident:Incident, user:User, content:string, date:Date){
        this.incident = incident;
        this.user = user;
        this.content = content;
        this.createdAt = date;
    }

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

    @Column()
    createdAt: Date;
}
