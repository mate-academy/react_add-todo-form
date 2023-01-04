import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Prop = {
  todos: Todo[];
};

export const TodoList: React.FC<Prop> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map((todo) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </ul>
);
