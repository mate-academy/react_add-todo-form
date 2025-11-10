import { Todo } from '../../types/Todo';
import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  const isTodoWithUser = (todo: Todo): todo is TodoWithUser => {
    return todo.user !== undefined;
  };

  const todosWithUser = todos.filter(isTodoWithUser);

  if (!todosWithUser.length) {
    return null;
  }

  return (
    <section className="TodoList">
      {todosWithUser.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
