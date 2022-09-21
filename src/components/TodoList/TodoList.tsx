import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../react-app-env';

type Props = {
  props: Todo[]
};

export const TodoList: React.FC<Props> = (props) => {
  return (
    <ul className="TodoList">
      {props.props.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoInfo todos={todo} />
        </React.Fragment>
      ))}
    </ul>
  );
};
