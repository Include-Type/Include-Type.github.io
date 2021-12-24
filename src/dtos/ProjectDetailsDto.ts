import { ProjectMember } from "../models/ProjectMember";
import { ProjectModel } from "../models/ProjectModel";

interface ProjectDetailsDto {
    project: ProjectModel,
    projectMembers: ProjectMember[],
    isAdmin: boolean
};

export type { ProjectDetailsDto }