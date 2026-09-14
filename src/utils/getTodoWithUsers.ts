import { Todo } from '../types/todos';
import { User } from '../types/users';

type TodoFromServer = Omit<Todo, 'user'>;

export const getTodosWithUsers = (todos: TodoFromServer[], users: User[]) => {
  const todosWithUsers: Todo[] = [];

  for (const todo of todos) {
    const user = users.find(u => u.id === todo.userId);

    if (user) {
      todosWithUsers.push({
        ...todo,
        user,
      });
    }
  }

  return todosWithUsers;
};
