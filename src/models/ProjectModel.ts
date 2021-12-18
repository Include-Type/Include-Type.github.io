// type ProjectPriority = "High" | "Medium" | "Low";

interface ProjectModel {
    id: string,
    projId: string,
    // projName: string,
    title: string,
    date: string,
    details: string,
    // deadline: string,
    // assigned: string,
    // completed: boolean,
    // priority: ProjectPriority,
    // author: string
};

export type { ProjectModel}