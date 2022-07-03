import { useDisclosure } from "@mantine/hooks";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Task } from "../api/dto";

export interface TaskContextInterface {
  currentTask: Partial<Task> | null;
  setCurrentTask: Dispatch<SetStateAction<Partial<Task> | null>>;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}
// Context of current viewed task for Dialog
const TaskContext = createContext<TaskContextInterface | null>(null);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task> | null>(null);

  const value = {
    currentTask,
    setCurrentTask,
    opened,
    setOpened,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
