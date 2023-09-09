import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../types';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoWithUser) => {
        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        );
      })}

    </section>
  );
};
