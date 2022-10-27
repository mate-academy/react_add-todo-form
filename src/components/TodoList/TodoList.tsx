import { FunctionComponent } from 'react';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todoList: Todo[]
};

export const TodoList: FunctionComponent<Props> = ({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}

    </section>
  );
};
