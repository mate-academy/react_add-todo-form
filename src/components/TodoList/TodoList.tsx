import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
