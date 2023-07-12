import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos ? todos.map(item => (
      <TodoInfo
        key={item.id}
        todo={item}
      />
    )) : null}
  </section>
);
