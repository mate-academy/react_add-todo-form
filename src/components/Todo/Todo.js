import React from 'react';

const Todo = ({ text, id, completed }) => 
(<div>
  {text}
  {id}
  {completed 
  ? 'true' 
  : 'false'}
</div>);

export default Todo;
