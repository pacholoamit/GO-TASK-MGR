export type Project = {
  ID: string;
  name: string;
  description: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Projects = Project[];

export type Task = {
  ID: string;
  title: string;
  description: string;
  status: string;
  label: string;
  ProjectID: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Tasks = Task[];

export type CreateProjectRequest = {
  name: string;
  description: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: string;
  label: string;
};
