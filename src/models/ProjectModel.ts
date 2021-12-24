type ProjectStatus = "Open" | "Closed" | "Terminated";

interface ProjectModel {
    id: string,
    date: string,
    name: string,
    status: ProjectStatus,
    about: string,
    documentation: string
};

export type { ProjectModel, ProjectStatus }