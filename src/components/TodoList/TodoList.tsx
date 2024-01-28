import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(({
        id, title, completed, userId,
      }) => (
        <TodoInfo
          todo={{
            id,
            title,
            completed,
            userId,
          }}
          key={id}
        />
      ))}
    </section>
  );
};
