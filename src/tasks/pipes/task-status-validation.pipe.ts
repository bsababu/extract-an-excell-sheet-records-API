import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status";
// import { TaskStatus } from "../task.model";
// eslint-disable-next-line no-unused-vars
import { TasksService } from "../tasks.service";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value:any){
        value = value.toUpperCase();

        if(!this.IsStatusValid(value)) {
            throw new BadRequestException(`This is wrong ${value} request`);
        }
        return value;
    }

    private IsStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !==-1;
    }
}