import React from 'react';

const TodosList = ({ todosWithUsers }) => (
  todosWithUsers.map(item => (
    <div className="todo-block" key={item.id}>
      <h2>
        {item.id}
        {`. Name: `}
        <span className="todo-list__name">{item.user.name}</span>
      </h2>
      <h2 className="todo-list">
        {`TODO: `}
        {item.title}
      </h2>
    </div>
  ))
);

export default TodosList;
