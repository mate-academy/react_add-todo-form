import User from './User';

interface ToDoItem {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user?: User | null,
}

export default ToDoItem;
