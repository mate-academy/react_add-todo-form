import React from 'react';

const Todo = (props) => {
  const handleTodoStatusChange = (id) => {
    props.handle(id);
  };

  return (
    <tr>
      <td
        className={props.todo.completed
          ? 'done clickable'
          : 'undone clickable'}
        onClick={() => handleTodoStatusChange(props.todo.id)}>

        {props.todo.completed ? 'Done' : ''}
      </td>
      <td
        className={props.todo.completed
          ? 'done'
          : 'undone'}>

        {props.todo.title}
      </td>
      <td
        className={props.todo.completed
          ? 'done'
          : 'undone'}
        title={`
          ${props.todo.user.name}
          Phone: ${props.todo.user.phone}
          E-Mail: ${props.todo.user.email}
          Company: ${props.todo.user.company.name}`
        }>

        {props.todo.user.name}
      </td>
      <td
        className={props.todo.completed
          ? 'done'
          : 'undone'}>

        {props.todo.user.email}
      </td>
    </tr>
  );
};

export default Todo;
