import React from 'react';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './component/TodoList/TodoList';
import { Form } from './component/Form/Form';

const preparedtodos = todos.map(todo => ({
  ...todo,
  users: users.find(user => user.id === todo.userId).name,
}));

const preparedUsers = users.map(user => user.name);

class App extends React.Component {
  state = {
    preparedTodos: preparedtodos,
  }

  addNewTodo = (chosenUser, enteredTitle) => {
    const { preparedTodos } = this.state;
    const newTodo = {
      userId: preparedTodos.id,
      id: this.state.preparedTodos.length + 1,
      title: enteredTitle,
      completed: false,
      users: chosenUser,
    };

    this.setState(prevState => ({
      preparedTodos: [
        ...prevState.preparedTodos,
        newTodo,
      ],
    }));
  }

  render() {
    const { preparedTodos } = this.state;

    return (
      <div className="App">
        <TodoList todos={preparedTodos} />
        <Form users={preparedUsers} addNewTodo={this.addNewTodo} />
      </div>
    );
  }
}

export default App;
