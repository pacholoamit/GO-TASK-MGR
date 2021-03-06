export const apiUrl =
  process.env.API_URL || `http://localhost:${process.env.PORT || "8081"}`;

// POST
export const createProjectEndpoint = `${apiUrl}/project`;

// GET
export const getAllProjectsEndpoint = `${apiUrl}/projects`;

// GET
export const getProjectEndpoint = (id: string) => `${apiUrl}/project/${id}`;

//PUT
export const updateProjectEndpoint = (id: string) => `${apiUrl}/project/${id}`;

// DELETE
export const deleteProjectEndpoint = (id: string) => `${apiUrl}/project/${id}`;

// POST
export const createTaskEndpoint = `${apiUrl}/task`;

//PUT
export const updateTaskEndpoint = (id: string) => `${apiUrl}/task/${id}`;

// GET
export const getAllTasksEndpoint = `${apiUrl}/tasks`;

// DELETE
export const deleteTaskEndpoint = (id: string) => `${apiUrl}/task/${id}`;

export const getAllTasksByProjectEndpoint = (id: string) =>
  `${apiUrl}/project/${id}/tasks`;
