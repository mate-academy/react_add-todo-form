import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos}) => {
  const list = todos.map(item => (
    <TodoItem
      key={item.id}
      item={item}
    />
  ));

  return list;
}

export default TodoList;
