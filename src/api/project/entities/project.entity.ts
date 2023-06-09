/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Report } from 'src/api/report/entities/report.entity';
import { Task } from 'src/api/task/entities/task.entity';
import { User } from 'src/api/user/entities/user.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from 'typeorm';
import { ProjectType } from '../enums/types.enum';

@Entity('projects')
export class Project extends AuditEntity{
    @Column({ unique: true }) 
    url: string;

    @Column()
    name: string;

    @Column({ 
        type: 'enum',
        enum: ProjectType,
        default: ProjectType. DEVELOPMENT
     })
    type: ProjectType;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @OneToMany(() => Report, (report) => report.project)
    reports: Report[];

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];
    
}
