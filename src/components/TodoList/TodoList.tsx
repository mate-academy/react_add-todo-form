import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC <TodoListProps> = ({ todos }) => (
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
