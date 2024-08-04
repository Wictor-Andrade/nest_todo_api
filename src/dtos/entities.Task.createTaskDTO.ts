import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDTO {
    @IsString()
    description: string;
    @IsDate()
    @Type(() => Date)
    day: Date;
}