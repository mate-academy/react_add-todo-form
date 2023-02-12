import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
