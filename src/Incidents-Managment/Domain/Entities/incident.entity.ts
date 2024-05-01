import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "src/Authentication-Managment/Domain/Entities/user.entity";
import { StatusIncident } from "../Enums/StatusIncident.enum";
import { TypeProblem } from "../Enums/TypeProblem.enum";

@Entity("Incident")
export class Incident {

    constructor(user:User, subject:string, imageUrl:string, type:string,details:string,status:string, createAt:Date, updated:Date){
        this.user = user;
        this.subject = subject;
        this.imageUrl = imageUrl;
        this.type=type;
        this.details=details;
        this.status=status;
        this.createAt = createAt;
        this.updateAt = updated;
    }

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
    type: string;
    
    @Column()
    details:string;
    
    @Column()
    status: string;
    
    @Column()
    createAt:Date;
    
    @Column()
    updateAt:Date;


    //////////
    @OneToMany(()=> Comment, Comment=>Comment.incident)
    comments: Comment[];
   
}
