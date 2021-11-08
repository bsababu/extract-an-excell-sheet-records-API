import {  IsNotEmpty, IsOptional } from "class-validator";


export class FilteredDto{

    @IsOptional() 
    @IsNotEmpty()
    search:string;

}