import React from 'react';

const Todo = ({ text, id, completed }) => (
  <div>
    <h1>{text}</h1>
    <p>{id}</p>
    <p>
      {completed
        ? 'true'
        : 'false'}
    </p>
  </div>
);

export default Todo;
