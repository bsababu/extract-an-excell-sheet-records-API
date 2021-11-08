/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { EntityRepository, Repository } from "typeorm";

import { Record} from "./task.entinty";
import { createRecordDto } from './dto/createTask.dto';
import { FilteredDto } from "./dto/get-tasks-filter.dto";
import * as excel from 'xlsx';

@EntityRepository(Record)
export class Recordrepository extends Repository<Record> {
    async createRecord(file): Promise<Record> {


        const {names,nid,phoneNumber,gender,email} = new createRecordDto;
        const task = new Record;
        const workbook = excel.readFile(file);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        for (const cell in worksheet) {
            const cellString = cell.toString();
            if(cellString[1] !== 'r' && cellString !=='m') {
                if(cellString[0] === 'A') {
                    task.names = worksheet[cell].v;
                }
                if(cellString[0] === 'B') {
                    task.phoneNumber = worksheet[cell].v;
                }
                if(cellString[0] === 'C') {
                    task.nid = worksheet[cell].v;
                }
                if(cellString[0] === 'D') {
                    task.gender = worksheet[cell].v;
                }
                if(cellString[0] === 'E') {
                    task.email = worksheet[cell].v;
                    await task.save();
                }
            }
        }
        return task;
    }

    async getRecords(filteredDto: FilteredDto): Promise<Record[]> {
        const {search} = filteredDto;
        const query = this.createQueryBuilder('task');
        const tasks = await query.getMany();

        return tasks;
    }

}