export type Project = {
  ID: number;
  name: string;
  description: string;
  CreatedAt: string;
  UpdatedAt: string;
};

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

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}
export type ProjectRequest = {
  ID?: number;
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
