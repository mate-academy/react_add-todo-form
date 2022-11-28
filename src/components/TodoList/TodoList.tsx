import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
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
