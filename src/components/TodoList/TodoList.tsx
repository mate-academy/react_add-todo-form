import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUserProps } from '../../types';

export const TodoList = ({ todos }: { todos: TodoWithUserProps[] }) => {
  return (
    <section className="TodoList" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
