import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/types.model';

interface IProps {
  todos: Todo[];
}

export const TodoList: React.FC<IProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
