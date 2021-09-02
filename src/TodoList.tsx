import React from 'react';

interface Param {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface Users {
  id: number,
  name: string,
}

type Props = {
  todoList: Param[];
  usersList: Users[]
};

class TodoList extends React.Component <Props> {
  state = {

  };

  getName = (toDo: { userId: number; }) => {
    const { usersList } = this.props;
    const seach = usersList.find(user => user.id === toDo.userId);

    return seach?.name;
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
