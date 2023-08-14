import { Todo } from '../types/Todo';
import { TodoWithUser } from '../types/TodoWithUser';
import { User } from '../types/User';

export const combineTodoAndUser = (
  todos: Todo[], users: User[],
): Array<TodoWithUser> => {
  const combinedData = todos.map((todo: Todo) => {
    const userObj: User | null
    = users.find((user: User) => user.id === todo.userId) || null;

    if (userObj !== null) {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
        user: {
          id: userObj.id,
          name: userObj.name,
          username: userObj.username,
          email: userObj.email,
        },
      };
    }

    return null;
  });

  const filteredData
  = combinedData.filter(data => data !== null) as TodoWithUser[];

  return filteredData;
};
