import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Record extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    names: string;

    @Column()
    nid: string;

    @Column()
    phoneNumber: string;

    @Column()
    gender: string;

    @Column()
    email: string;
}
    