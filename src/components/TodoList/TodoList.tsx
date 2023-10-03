import { Todo } from '../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { id } = todo;

        return (
          <TodoInfo
            key={id}
            todo={todo}
          />
        );
      })}
    </section>
  );
};
