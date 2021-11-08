/* eslint-disable no-unused-vars */
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { createRecordDto} from './dto/createTask.dto';
import { FilteredDto } from './dto/get-tasks-filter.dto';
import { Record} from './task.entinty';
import { Recordrepository} from './task.repository';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Recordrepository)
        private TaskRepository: Recordrepository
    ) {}
    

    async getRecords(filteredDto: FilteredDto): Promise<Record[]> {
        return this.TaskRepository.getRecords(filteredDto);
    }

    

   async createRecord(file): Promise<Record> {
        return this.TaskRepository.createRecord(file);
    }

}
