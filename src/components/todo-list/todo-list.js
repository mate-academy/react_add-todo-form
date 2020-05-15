import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
        <TodoListItem key={id}
        {...itemProps } id = {id}
      />
    );
  });

  return (
    <div className="row row-cols-6 row-cols-md-6">
      { elements }
      </div>
  );
};

export default TodoList;
