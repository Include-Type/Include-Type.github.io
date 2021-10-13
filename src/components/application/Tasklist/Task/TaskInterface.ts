type TaskPriority = "High" | "Medium" | "Low";

interface Task {
    id: string,
    projId: string,
    projName: string,
    title: string,
    date: string,
    details: string,
    deadline: string,
    assigned: string,
    completed: boolean,
    priority: TaskPriority
};

export type { Task, TaskPriority }