export type Project = {
  ID: number;
  name: string;
  description: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Projects = Project[];

export type Task = {
  ID: number;
  title: string;
  description: string;
  status: string;
  label: string;
  projectId: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Tasks = Task[];

export type CreateProjectRequest = {
  name: string;
  description: string;
};

export type TaskRequest = {
  ID?: number;
  title: string;
  description: string;
  status: string;
  label: string;
  projectId?: number | string;
};
