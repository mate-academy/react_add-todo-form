import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          data-id={todo.id}
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
