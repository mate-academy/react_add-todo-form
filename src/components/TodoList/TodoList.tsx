import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type ToDo = {
  todos: Todo[];
};

export const TodoList: React.FC<ToDo> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
