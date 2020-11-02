import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(task => ({
  ...task,
  user: users.find(us => us.id === task.userId),
}));

class App extends React.PureComponent {
  state = {
    tasks: preparedTodos,
  }

  addTodo = (newUser, title) => {
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
        <div className="App__list">
          <TodoList tasksList={this.state.tasks} />
        </div>

        <Form addTodo={this.addTodo} users={users} />
      </div>
    );
  }
}

export default App;
