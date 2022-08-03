import { Tag } from "./tag";

export type TaskStatus = 'completed' | 'ongoing' | 'critical'

export interface Task {
    name: string;
    description?: string;
    tags?: Tag[]
    status: TaskStatus;
}