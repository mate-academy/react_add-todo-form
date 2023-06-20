import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types/types';

type Props = {
  todos: ToDo[] | [];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
