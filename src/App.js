import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import AddTasksForm from './components/AddTasksForm';
import TasksList from './components/TasksList';

const getUserById = userId => (
  users.find(user => user.id === userId)
);

const preparedTasks = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.PureComponent {
  state = {
    tasks: [...preparedTasks],
  }

  addTask = (taskName, selectedNameId) => {
    this.setState(({ tasks }) => {
      const newTask = {
        userId: selectedNameId,
        id: tasks.length + 1,
        title: taskName,
        completed: false,
        user: getUserById(selectedNameId),
      };

      return {
        tasks: [newTask, ...tasks],
      };
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTasksForm addTask={this.addTask} />
        <TasksList tasks={tasks} />
      </div>
    );
  }
}

export default App;
