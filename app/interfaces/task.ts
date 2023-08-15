import { Tag } from "./tag";

export enum TaskStatus {
    COMPLETED = 'COMPLETED',
    ONGOING = 'ONGOING',
    CRITICAL = 'CRITICAL'
}

export interface Task {
    name: string;
    description?: string;
    tags?: Tag[]
    status: TaskStatus;
}