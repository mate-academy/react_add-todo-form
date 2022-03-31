import React from 'react';

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <>
          <li
            key={todo.id}
          >
            Title:
            {' '}
            {todo.title}
            {' '}
            <br />
            Todo id:
            {' '}
            {todo.id}
            {' '}
            <br />
            User id:
            {' '}
            {todo.userId}
            {' '}
            <br />
            Status:
            {' '}
            {todo.completed
              ? 'Done'
              : 'Not Completed'}
          </li>
          <hr />
        </>
      ))}
    </ul>
  );
};

export default TodoList;
