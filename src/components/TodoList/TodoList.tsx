import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../..';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={todo.user} />
      ))}
    </section>
  );
};
