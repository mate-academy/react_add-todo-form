import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Array<Todo>;
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(item => (
      <TodoInfo key={item.id} todos={item} />
    ))}
  </section>
);
