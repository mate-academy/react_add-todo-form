import React from 'react';
import { PrepearedTodos } from '../../react-app-env';

interface Props {
  list: PrepearedTodos[]
}

export const TodoList : React.FC<Props> = ({ list }) => {
  return (
    <ul className="container list">
      {list.map(singleTodo => {
        return (
          <li
            className="list__item"
            key={singleTodo.id}
          >
            <p>{`Id : ${singleTodo.id}`}</p>
            <p>{`Title : ${singleTodo.title}`}</p>
            <p>{`UserId : ${singleTodo.userId}`}</p>
            <p>{`Completed : ${singleTodo.completed}`}</p>
          </li>
        );
      })}
    </ul>
  );
};
