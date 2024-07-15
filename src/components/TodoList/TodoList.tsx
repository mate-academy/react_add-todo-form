import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
