import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div
          className="todo-list__todo"
          key={todo.id}
        >
          <TodoInfo
            todo={todo}
          />
        </div>
      ))}
    </div>
  );
};
