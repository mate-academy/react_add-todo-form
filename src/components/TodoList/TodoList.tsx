import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {
      todos.map((el: TodoWithUser) => <TodoInfo todo={el} key={el.id} />)
    }
  </section>
);
