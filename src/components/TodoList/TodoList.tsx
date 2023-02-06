import { TodosList } from '../../types/TodoList';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodosList;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
