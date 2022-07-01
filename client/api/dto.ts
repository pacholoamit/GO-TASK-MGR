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
  Title: string;
  Description: string;
  Status: string;
  Label: string;
  ProjectID: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type Tasks = Task[];
