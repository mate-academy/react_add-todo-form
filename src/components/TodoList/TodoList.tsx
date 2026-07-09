import { Todos } from '../../App';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todos[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
