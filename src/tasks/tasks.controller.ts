/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createRecordDto } from './dto/createTask.dto';
import { FilteredDto } from './dto/get-tasks-filter.dto';

import { Record } from './task.entinty';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}



    //Displaying all the records
    @Get()
    getRecords(@Query(ValidationPipe) filteredDto: FilteredDto): Promise<Record[]> {
        return this.taskService.getRecords(filteredDto);
    }
  

    //To receive the xlsx file
    @Post('/:file')
    @UsePipes(ValidationPipe)
    createRecord(@Body() file :string): Promise<Record> {
        return this.taskService.createRecord(file);

    }


}
