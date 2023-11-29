import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';

interface TypesTodoList {
  todos: Todo[];
}

export const TodoList: React.FC<TypesTodoList> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
