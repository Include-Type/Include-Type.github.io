type TaskPriority = "High" | "Medium" | "Low";

interface Task {
    id: string,
    projName: string,
    title: string,
    date: string,
    details: any,
    deadline: string,
    assigned: string,
    completed: Boolean,
    priority: TaskPriority
};

export type { Task, TaskPriority }