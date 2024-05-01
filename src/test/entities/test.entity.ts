import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pipip")
export class Test {

    @PrimaryGeneratedColumn()
    testId:number;

    @Column()
    name:string;
}
