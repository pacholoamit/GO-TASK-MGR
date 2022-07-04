import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TaskRequest } from "../api/dto";

export interface TaskContextInterface {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  currentTask: TaskRequest | null;
  proxyTask: (task: TaskRequest) => void;
  newTask: () => void;
  clearTask: () => void;
}
// Context of current viewed task for Dialog
const TaskContext = createContext<TaskContextInterface | null>(null);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskRequest | null>(null);

  const proxyTask = (task: TaskRequest) => {
    setCurrentTask(task);
    setOpened(true);
  };

  const newTask = () => {
    setCurrentTask(null);
    setOpened(true);
  };

  const clearTask = () => {
    setCurrentTask(null);
    setOpened(false);
  };
  const value: TaskContextInterface = {
    opened,
    setOpened,
    currentTask,
    newTask,
    proxyTask,
    clearTask,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
