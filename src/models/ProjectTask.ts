type TaskPriority = "High" | "Medium" | "Low";

interface ProjectTask {
    id: string,
    projId: string,
    projName: string,
    title: string,
    date: string,
    details: string,
    deadline: string,
    assigned: string,
    completed: boolean,
    priority: TaskPriority | string,
    author: string
};

export type { ProjectTask, TaskPriority }