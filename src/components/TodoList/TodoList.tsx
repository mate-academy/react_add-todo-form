import { Todos } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  todos: Todos
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul>
        {todos.map(todo => (
          <li>
            <TodoInfo todo={todo} key={todo.id} />
          </li>
        ))}

      </ul>
    </section>
  );
};
