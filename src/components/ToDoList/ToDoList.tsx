import React from 'react';
import { ToDo } from '../../types/ToDo';
import './ToDoList.scss';

export const ToDoList: React.FC<{ todos: ToDo[] }> = ({ todos }) => {
  return (
    <ul className="ToDoList">
      <li className="ToDoList-Item">
        <h2 className="ToDoList-Title ToDoList-Title_First">What need to do</h2>
        <p className="ToDoList-User">User name</p>
        <p className="ToDoList-Status">Status</p>
      </li>
      {todos.map((todo: ToDo) => {
        const {
          title,
          id,
          completed,
          user,
        } = todo;

        return (
          <li key={id} className="ToDoList-Item">
            <h2 className="ToDoList-Title">{title}</h2>
            <p className="ToDoList-User">{user?.name}</p>
            <p
              className="ToDoList-Status"
            >
              {completed ? 'Done' : 'In progress'}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
