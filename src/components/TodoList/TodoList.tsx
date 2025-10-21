import { Todo } from '../../domain/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <ul data-cy="todoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </ul>
);
