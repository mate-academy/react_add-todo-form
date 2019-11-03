import React from 'react';

function Todolist({state}) {
  return (
    <div className="task_box">
      {state.arrayToDo.task.map((item, index) => <span><strong>
      Task: </strong> {item} <br/>
      Name: {state.arrayToDo.name[index]} <br/> <br/></span>)}
    </div>
  );
}

export default Todolist;
