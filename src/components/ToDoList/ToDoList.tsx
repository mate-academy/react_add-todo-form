import React from 'react';
import { ToDoInfo } from '../ToDoInfo';
import { ToDo } from '../../types/ToDo';
import './ToDoList.scss';

type Props = {
  list: ToDo[];
};

export const ToDoList: React.FC<Props> = ({ list }) => (
  <div className="toDoList">
    <h2 className="toDoList__title">To Do List:</h2>

    <ul className="list">
      {list.map(item => (
        <li key={item.id} className="list__item item">
          <ToDoInfo
            user={item.user}
            title={item.title}
            completed={item.completed}
          />
        </li>
      ))}
    </ul>
  </div>
);
