import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(({ completed, id, title, userId }) => (
        <TodoInfo
          key={id}
          todoId={id}
          completed={completed}
          title={title}
          userId={userId}
        />
      ))}
    </section>
  );
};
