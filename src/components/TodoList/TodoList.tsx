import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{
  todos: TodoWithUser[],
  theme: 'light' | 'dark',
}> = ({ todos, theme }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
            theme={theme}
          />
        );
      })}
    </section>
  );
};
