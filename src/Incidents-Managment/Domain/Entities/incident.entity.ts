import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "src/Authentication-Managment/Domain/Entities/user.entity";
import { StatusIncident } from "../Enums/StatusIncident.enum";
import { TypeProblem } from "../Enums/TypeProblem.enum";

@Entity("Incident")
export class Incident {

    @PrimaryGeneratedColumn()
    incidentId:Number;

    @ManyToOne(()=> User, user=>user.incident)
    @JoinColumn({name:'userId'})
    user:User;
    
    @Column()
    subject:string;
    
    @Column()
    imageUrl:string;
    
    @Column()
    type: TypeProblem;
    
    @Column()
    details:string;
    
    @Column()
    status: StatusIncident;
    
    @Column()
    createAt:Date;
    
    @Column()
    updateAt:Date;


    //////////
    @OneToMany(()=> Comment, Comment=>Comment.incident)
    comments: Comment[];
   
}
