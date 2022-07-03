import { useDisclosure } from "@mantine/hooks";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TaskRequest, Task } from "../api/dto";

export interface TaskContextInterface {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  currentTask: TaskRequest | null;
  receiveTask: (task: TaskRequest) => void;
}
// Context of current viewed task for Dialog
const TaskContext = createContext<TaskContextInterface | null>(null);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskRequest | null>(null);

  const receiveTask = (task: TaskRequest) => {
    setCurrentTask(task);
    setOpened(true);
  };

  const value: TaskContextInterface = {
    opened,
    currentTask,
    setOpened,
    receiveTask,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
