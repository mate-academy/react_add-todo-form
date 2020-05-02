import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './TodoList.scss';

const TodoList = ({ preparedToDos }) => (
  <section className="container">
    {preparedToDos.map(todo => <ToDoItem todo={todo} key={todo.id} />)}
  </section>
);

export default TodoList;
