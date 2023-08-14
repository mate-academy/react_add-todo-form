import { User } from '../../types/User';
import { TodoWithUser } from '../../types/TodoWithUser';

export const handleOnSubmit = (
  event: React.FormEvent,
  setTodos: React.Dispatch<React.SetStateAction<TodoWithUser[]>>,
  todos: TodoWithUser[],
  titleOfNewTodo: string,
  selectedUserId: number,
  usersFromServer: User[],
  setSelectedUserId: React.Dispatch<React.SetStateAction<User['id']>>,
  setTitleOfNewTodo: React.Dispatch<React.SetStateAction<string>>,
) => {
  event.preventDefault();

  const newTodo = {
    id: todos.length + 1,
    title: titleOfNewTodo.trim(),
    completed: false,
    userId: selectedUserId,
    user: usersFromServer.find(user => user.id === selectedUserId) as User,
  };

  setTodos([...todos, newTodo]);
  setSelectedUserId(0);
  setTitleOfNewTodo('');
};
