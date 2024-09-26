import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}