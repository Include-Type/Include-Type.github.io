type IssuePriority = "High" | "Medium" | "Low";

interface ProjectIssue {
    id: string,
    projId: string,
    projName: string,
    title: string,
    date: string,
    details: string,
    deadline: string,
    assigned: string,
    completed: boolean,
    priority: IssuePriority
};

export type { ProjectIssue, IssuePriority }