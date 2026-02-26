import { Todos } from '../../types/Todos';
import { Users } from '../../types/Users';
import { TodoInfo } from '../TodoInfo';

type TodoWithUser = Todos & {
  user: Users;
};

type TodoListProps = {
  todos: TodoWithUser[];
  users?: Users[];
};

export const TodoList = ({ todos, users }: TodoListProps) => {
  if (!todos || !users) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
