import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};
