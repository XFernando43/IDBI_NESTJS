import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user-type.entity";
import { Comment } from "src/Incidents-Managment/Domain/Entities/comment.entity";
import { Incident } from "src/Incidents-Managment/Domain/Entities/incident.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

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
    @JoinColumn({name:"TypeId"})
    userType: UserType;



    ////////////////////
    @OneToMany(() => Comment, comment => comment.User)
    comments: Comment[]   

    @OneToMany(()=> Incident, incident=>incident.User)
    Incident:Incident;
   
}
