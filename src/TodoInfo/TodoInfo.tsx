import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
  deleteTodo: any,
};

type Styles = {
  color: string;
  fontSize: string,
  fontWeight: number,
};

const red: Styles = {
  color: 'red',
  fontSize: '22px',
  fontWeight: 900,
};

const green: Styles = {
  color: 'green',
  fontSize: '22px',
  fontWeight: 900,
};

export const TodoInfo: React.FC<Props> = ({ todo, deleteTodo }) => {
  return (
    <div className="todoBlock">
      <h3 className="todoBlock__title">{todo.title}</h3>
      <p className="todoBlock__status">
        Status of todo:&nbsp;
        <span style={!todo.completed ? red : green}>
          {!todo.completed ? 'Still in progress' : 'Completed'}
        </span>
      </p>
      <p className="todoBlock__respPerson">Mentor:</p>
      {todo.user && <UserInfo user={todo.user} />}
      <button
        type="button"
        className="todoBlock__closeBtn"
        onClick={() => deleteTodo(todo.id)}
      >
        X
      </button>
    </div>
  );
};
