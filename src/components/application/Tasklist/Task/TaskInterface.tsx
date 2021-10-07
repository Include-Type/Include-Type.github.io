interface Task {
    projName: string,
    title: string,
    date: string,
    details: any,
    deadline: string,
    assigned:string,
    read: Boolean,
    important: Boolean
};

export type { Task }