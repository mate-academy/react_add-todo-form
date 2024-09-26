import { TodoItem } from '../../types/TodoItem';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoItem[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
