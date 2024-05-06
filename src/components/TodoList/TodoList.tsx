import TodoWithUser from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';
import { findMaxTodoId } from '../../services';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo, _index, arr) => (
      <TodoInfo todo={{ ...todo, id: findMaxTodoId(arr) + 1 }} key={todo.id} />
    ))}
  </section>
);
