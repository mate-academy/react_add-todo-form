import { FC } from 'react';
import { Todo } from '../../api/todos';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../api/users';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: FC<Props> = props => {
  const { todos , users} = props;

  return (
    <section className="TodoList">
      {todos.map((todo: Todo): JSX.Element => {
        return <TodoInfo todo={todo} key={todo.id} users={users}/>;
      })}
    </section>
  );
};
