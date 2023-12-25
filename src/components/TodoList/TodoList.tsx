import { Todo, TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <ul>
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </ul>
);
