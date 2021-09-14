import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import users from './api/users';
import todos from './api/todos';

const preparedTasks = todos.map(task => ({
  ...task,
  user: users.find(person => person.id === task.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    taskId: preparedTasks[preparedTasks.length - 1].id + 1,
    tasks: preparedTasks,
  };

  addTask = (newTask: Task): void => {
    this.setState((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  };

  render() {
    const {
      tasks,
    } = this.state;

    return (
      <div className="App container vh-100 d-flex flex-column justify-content-between">
        <Form
          addTask={this.addTask}
          currentTaskId={this.state.taskId}
        />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
