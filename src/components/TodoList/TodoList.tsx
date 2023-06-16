import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList:React.FC<Props> = ({ todos = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          id={todo.userId}
          title={todo.title}
          key={todo.id}
          user={todo.user}
          completed={todo.completed}
        />
      ))}
    </section>
  );
};
