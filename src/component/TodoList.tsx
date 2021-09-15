import React from 'react';

type Props = {
  todoList: Todo[];
  usersList: User[]
};

class TodoList extends React.Component <Props, {}> {
  getName = (toDo: { userId: number; }) => {
    const { usersList } = this.props;
    const search = usersList.find(user => user.id === toDo.userId);

    return search?.name;
  };

  render() {
    const { todoList } = this.props;

    return (
      <>
        {todoList.map(todo => (
          <tr key={todo.id}>
            <td>
              <span>
                {todo.title}
              </span>
            </td>

            <td>
              <p>
                In process
              </p>
            </td>

            <td>
              <p>
                {this.getName(todo)}
              </p>
            </td>
          </tr>
        ))}
      </>
    );
  }
}

export default TodoList;
