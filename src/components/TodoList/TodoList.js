import React from 'react';

import Todo from '../Todo/Todo';

const TodoList
  = ({ todos, }) => {
    return (
      <div>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            text={todo.title}
            id={todo.id}
            comleted={todo.completed}
          />
        ))}
      </div>
  );
  };

export default TodoList;
