import { Day } from '../entities/Day';

export interface Task {
    id: string;
    description?: string;
    completed: boolean;
    dayId: string;
    day?: Day;
}