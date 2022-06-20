import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../Types/Todo';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <td className="has-text-centered">
        {todo.id}
      </td>
      <td className="">
        {todo.title}
      </td>
      <td className="has-text-centered">
        {todo.user?.name}
      </td>
      <td className="has-text-centered">
        {todo.user?.email}
      </td>
      <td className={classNames('has-text-centered', {
        'has-background-success': todo.completed,
        'has-background-danger': !todo.completed,
      })}
      >
        {`${todo.completed ? 'Yup' : 'Nope'}`}
      </td>
    </>
  );
};
