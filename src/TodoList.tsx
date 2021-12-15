import React from 'react';

interface Props {
  usersTodoArray: Todo[];
}

const TodoList: React.FC<Props> = ({ usersTodoArray }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>TITLE</th>
          <th>COMPLETED</th>
        </tr>
      </thead>
      <tbody>
        {usersTodoArray.map(todo => {
          return (
            <>
              <tr>
                <th>{todo.user?.name}</th>
                <th>{todo.user?.username}</th>
                <th>{todo.user?.email}</th>
                <th>{todo.title}</th>
                <th>{todo.completed ? 'Yes' : 'No'}</th>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
