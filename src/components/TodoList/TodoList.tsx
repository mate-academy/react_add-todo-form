import { TodoInfo } from '../TodoInfo';
import Todo from '../../types/Todo';
import User from '../../types/User';

type Props = {
  todos: (Todo & { user: User })[];
  onToggle?: (id: number) => void; // Adicionamos onToggle aqui também
};

export const TodoList: React.FC<Props> = ({ todos, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          onToggle={onToggle ? () => onToggle(todo.id) : undefined}
        />
      ))}
    </div>
  );
};
