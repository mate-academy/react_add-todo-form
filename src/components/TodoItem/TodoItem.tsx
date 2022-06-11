import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import Completed from '../../image/Completed.png';
import NoCompl from '../../image/CrossMark.png';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <h2>{todo.title}</h2>
      {
        (todo.completed)
          ? <img src={Completed} alt="Completed" />
          : <img src={NoCompl} alt="NoCompleted" className="todoList__image" />
      }
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
