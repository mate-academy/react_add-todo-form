import { TodoInfo } from '../TodoInfo';
import { UserTodo } from '../../types/Todo.model';

interface Props {
  todos: UserTodo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
