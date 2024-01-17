import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList = (props: Props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(
        todo => (
          <TodoInfo
            todo={todo}
            key={todo.id}
          />
        ),
      )}
    </section>
  );
};
