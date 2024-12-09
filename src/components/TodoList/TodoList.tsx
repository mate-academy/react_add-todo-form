import { TodoWithUser } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList = (props: Props) => {
  return (
    <section className="TodoList">
      {props.todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
