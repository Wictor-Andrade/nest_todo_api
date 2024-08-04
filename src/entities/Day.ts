import { Task } from '../entities/Task';
export interface Day {
    id: string;
    date: Date;
    tasks?: Task[];
}