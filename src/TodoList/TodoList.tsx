import React from 'react';
import './TodoList.scss';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todoList } = props;

  return (
    <div className="TodoList App__TodoList">
      <table className="TodoList__table">
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Todo</th>
          <th>Completed</th>
        </thead>
        {todoList.map(todoItem => (
          <tr key={todoItem.id}>
            <td>{todoItem.user?.name}</td>
            <td>{todoItem.user?.email}</td>
            <td>{todoItem.title}</td>
            <td>{todoItem.completed ? '\u2705' : '\u274c'}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
