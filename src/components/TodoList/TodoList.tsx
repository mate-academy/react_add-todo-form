import { Todo, TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <div>
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </div>
);
