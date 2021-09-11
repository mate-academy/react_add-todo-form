import React from 'react';
import { Todo } from '../../react-app-env';

interface Props {
  userTodos: Todo[]
}

export const TodoTable: React.FC<Props> = (props) => {
  const { userTodos } = props;

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Email</th>
        </tr>
      </thead>
      {userTodos && userTodos.map(person => (
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
