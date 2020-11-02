import React from 'react';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './component/TodoList/TodoList';
import { Form } from './component/Form/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  users: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    usersData: preparedTodos,
  }

  addNewTodo = (chosenUser, enteredTitle) => {
    const { usersData } = this.state;

    if (enteredTitle !== ''
    && chosenUser !== 'Choose a user') {
      const newTodo = {
        id: usersData.length + 1,
        title: enteredTitle,
        completed: false,
        users: chosenUser,
      };

      this.setState(prevState => ({
        usersData: [
          ...prevState.usersData,
          newTodo,
        ],
      }));
    }
  }

  render() {
    const { usersData } = this.state;

    return (
      <div className="App">
        <TodoList todos={usersData} />
        <Form users={users} addNewTodo={this.addNewTodo} />
      </div>
    );
  }
}

export default App;
