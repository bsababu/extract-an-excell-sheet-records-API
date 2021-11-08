import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Recordrepository } from './task.repository';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([Recordrepository]),
        AuthModule,
    ],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
