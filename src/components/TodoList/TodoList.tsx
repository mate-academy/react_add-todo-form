import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(({
      id,
      title,
      completed,
      userId,
    }) => (
      <TodoInfo
        key={id}
        id={id}
        title={title}
        completed={completed}
        userId={userId}
      />
    ))}
  </section>
);
