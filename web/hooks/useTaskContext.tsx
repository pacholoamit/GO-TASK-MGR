import TaskContext, {
  TaskContextInterface,
} from "../providers/task.context.provider";
import { useContext } from "react";

const useTaskContext = () => useContext(TaskContext) as TaskContextInterface;

export default useTaskContext;
