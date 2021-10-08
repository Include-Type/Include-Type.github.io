type Priority = "High" | "Medium" | "Low";

interface Task {
    id: string,
    projName: string,
    title: string,
    date: string,
    details: any,
    deadline: string,
    assigned:string,
    read: Boolean,
    priority: Priority
};

export type { Task }