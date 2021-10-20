/* eslint-disable import/no-duplicates */

import React from 'react';

import ToDo from '../ToDo/ToDo';

import ToDoItem from '../../types/ToDoItem';

type Props = {
  todos: ToDoItem[],
};

const ToDoList:React.FC<Props> = ({ todos }) => (
  <div className="ToDoList">
    {todos.map(todo => <ToDo todo={todo} />)}
  </div>
);

export default ToDoList;
