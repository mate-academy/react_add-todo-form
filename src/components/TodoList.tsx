import React from 'react';
import { PrepArray } from '../react-app-env';

interface Props {
  todosCurrent: PrepArray[];
}
export const TodoList: React.FC<Props> = ({ todosCurrent }) => (
  <>
    {todosCurrent.map(item => (
      <div className="App__box" key={item.id}>
        <p>
          <span className="App__span">Name: </span>
          {item.user?.name}
        </p>
        <p>
          <span className="App__span">Title: </span>
          {item.title}
        </p>
        <p>
          <span className="App__span">Id: </span>
          {item.id}
        </p>
        <p>
          <span className="App__span">Compleated: </span>
          {`${item.completed}`}
        </p>
      </div>
    ))}
  </>
);
