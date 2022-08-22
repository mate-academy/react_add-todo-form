import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  users: User[]
};

export const TodoList:React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} users={users} key={uuidv4()} />
      ))}
    </section>
  );
};
