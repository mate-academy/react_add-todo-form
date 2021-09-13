import React from 'react';
import { Todo } from '../../react-app-env';

interface Props {
  todos: Todo[]
}

export const TodoTable: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Email</th>
        </tr>
      </thead>
      {todos && todos.map(person => (
        <tbody key={person.id}>
          <tr>
            <td>{person.user.name}</td>
            <td>{person.title}</td>
            <td>{person.user.email}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
