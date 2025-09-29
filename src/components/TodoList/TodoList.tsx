import { ExtendedTodo } from '../../types/ExtendedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ExtendedTodo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map((todo: ExtendedTodo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
