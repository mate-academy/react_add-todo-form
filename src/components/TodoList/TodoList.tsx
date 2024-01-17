import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../types';

export const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  return (
    <div>
      <section className="TodoList">
        {todoList.map(todo => (
          <TodoInfo
            key={todo.id}
            todoInfo={todo}
            data-id={todo.id}
          />
        ))}
      </section>
    </div>
  );
};
