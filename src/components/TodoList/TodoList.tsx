import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      ))}
    </section>
  );
};
