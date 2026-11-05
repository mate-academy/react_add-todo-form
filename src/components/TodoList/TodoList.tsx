import { TodoInfo, type Todo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <>
    {todos.map(todo => (
      <TodoInfo
          key={todo.id}
          todo={todo}
        />
    ))}
  </>
);
