import { TodoInfoType } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoInfoType[];
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
