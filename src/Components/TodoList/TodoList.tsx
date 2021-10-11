import './TodoList.css';

interface Props {
  users: User[],
}

export const TodoList = (props: Props) => {
  const { users } = props;

  return (
    <div className="container">
      <table className="table">
        <thead className="table-thead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>TODO</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            user.todos.map(todo => (
              <tr key={todo.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'complete' : 'no complete'}</td>
              </tr>
            ))))}
        </tbody>
      </table>
    </div>
  );
};
