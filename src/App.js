import React from 'react';
import './App.css';
import { Form } from './components/Form';
import 'semantic-ui-css/semantic.min.css';

import users from './api/users';
import todos from './api/todos';
import { AddPerson } from './components/AddPerson';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    tasks: preparedTodos,
  }

  addUser = (newUser, title) => {
    const newTodo = {
      id: this.state.tasks.length + 1,
      title,
      completed: false,
      user: newUser,
      userId: newUser.id,
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <Form addUser={this.addUser} users={users} />
        <div className="App__list">
          <AddPerson todos={this.state.tasks} />
        </div>
      </div>
    );
  }
}

export default App;
