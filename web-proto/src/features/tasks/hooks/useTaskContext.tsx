import { useContext } from "react";
import TaskContext, {
  TaskContextInterface,
} from "@/providers/task.context.provider";

const useTaskContext = () => useContext(TaskContext) as TaskContextInterface;

export default useTaskContext;
