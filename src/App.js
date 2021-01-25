import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    tasks: preparedTodos,
  }

  addTask = (title, name) => {
    const userId = users.find(user => user.name === name).id;
    const { tasks } = this.state;
    const newTask = {
      userId,
      id: tasks.length + 1,
      title,
      completed: false,
      user: {
        name,
      },
    };

    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        newTask,
      ],
    }));
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Todo List</h1>
        </header>

        <TodoForm
          todos={preparedTodos}
          users={users}
          addTask={this.addTask}
        />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
