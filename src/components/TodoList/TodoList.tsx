import usersFromServer from '../../api/users';
import { TodoInfo, type Todo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <>
    {todos.map(todo => {
      const user = usersFromServer.find(serverUser => serverUser.id === todo.userId);

      if (!user) {
        return null;
      }

      return (
        <TodoInfo
          key={todo.id}
          todo={{
            ...todo,
            user,
          }}
        />
      );
    })}
  </>
);
