import React from 'react';

import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <table className="table App__table">
      <thead className="table__thead">
        <tr>
          <td className="col"> Name </td>
          <td className="col"> Username </td>
          <td className="col"> Email </td>
          <td className="col"> Title </td>
          <td className="col"> Completed </td>
        </tr>
      </thead>
      <tbody>
        {
          todos.map(item => (
            <tr
              key={item.id}
              className={classNames(
                'table__row',
                { 'table__completed--yes': item.completed },
                { 'table__completed--no': !item.completed },
              )}
            >
              {item.user && <TodoInfo todo={item} />}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
