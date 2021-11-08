import { IsNotEmpty } from "class-validator";

export class createRecordDto {
    @IsNotEmpty()
    names: string;

    @IsNotEmpty()
    nid: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    email: string;
} 


