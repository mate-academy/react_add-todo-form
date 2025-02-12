import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        title={todo.title}
        completed={todo.completed}
        userId={todo.userId}
        user={todo.user}
        key={todo.id}
      />
    ))}
  </section>
);
