import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todosArr: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosArr = [] }) => (
  <ul className="TodoList">
    {todosArr.map((oneTodo: Todo) => (
      <li key={oneTodo.id}>
        <TodoInfo {...oneTodo} />
      </li>
    ))}
  </ul>
);
