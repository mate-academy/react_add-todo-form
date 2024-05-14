import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

type TodoListProps = {
  todos: (Todo & { user: User })[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
