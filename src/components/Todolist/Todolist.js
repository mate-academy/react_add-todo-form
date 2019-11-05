import React from 'react';

function Todolist({state}) {
  return (
    <div className="task_box">
      {state.task.map((item, index) =>
        <p>
          <strong>
            Task:
          </strong> {item} <br/>
      Name: {state.name[index]} <br/> <br/>
        </p>)}
    </div>
  );
}

export default Todolist;
