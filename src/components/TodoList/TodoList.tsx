import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { user, id } = todo;

        return user && (
          <TodoInfo
            todo={todo}
            user={user}
            key={id}
            data-id={todo.id}
          />
        );
      })}
    </section>
  );
};
