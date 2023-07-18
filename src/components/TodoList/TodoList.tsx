import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <section className="TodoList">
    {
      todos.map(todo => (
        <TodoInfo todo={todo} data-id={todo.id} />
      ))
    }
  </section>
);
