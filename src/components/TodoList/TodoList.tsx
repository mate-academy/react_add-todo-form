import findMaxTodoId from '../../services/findMaxTodoId';
import TodoWithUser from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo, _index, array) => (
      <TodoInfo
        todo={{ ...todo, id: findMaxTodoId(array) + 1 }}
        key={todo.id}
      />
    ))}
  </section>
);
