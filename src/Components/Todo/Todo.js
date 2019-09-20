import React from 'react';

function Todo(props) {
  const {
    tasks,
    names,
  } = props;

  return (
    <div>
      {tasks.map((item, index) =>
      <div>
        <span><strong> Task: </strong> {item}</span>
        <span><strong> Name: </strong>{names[index]}</span>
        <span><strong> ID: {index+1}</strong></span>
      </div>)}
    </div>
  );
}

export default Todo;
