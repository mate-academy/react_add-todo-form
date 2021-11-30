import React from 'react';
import { ToDoType } from '../api/type';

interface Props {
  toDos: ToDoType[],
}

export const Todo: React.FC<Props> = ({ toDos }) => (
  <ul className="list">
    {
      toDos.map((todo => {
        return (
          <li className="list__item">
            <p>
              {`Title: ${todo.title}`}
            </p>
            <p>
              {`To do ID: ${todo.id}`}
            </p>
          </li>
        );
      }))
    }
  </ul>
);
