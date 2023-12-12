export interface TodoInfoProps {
  todo: Task;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default TodoInfoProps;
