import { Day } from '../entities/Day';

export class Task {
    id: string;
    description: string;
    completed: boolean;
    dayId: string;
    day?: Day;
}