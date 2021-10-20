import User from './User';

interface ToDoItem {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User,
}

export default ToDoItem;
