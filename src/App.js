import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodosList } from './components/TodosList/TodosList';
import { TodosForm } from './components/TodosForm/TodosForm';

const getUserById = userId => (
  users.find(user => user.id === userId).name
);

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    tasks: todosWithUsers,
  }

  addTodo = (todoTitle, userId) => {
    const newTodo = {
      id: this.state.tasks.length + 1,
      title: todoTitle,
      user: getUserById(userId),
    };

    this.setState(state => ({
      tasks: [...state.tasks, newTodo],
    }));
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <TodosForm onAdd={this.addTodo} />
        <TodosList todos={tasks} />
      </div>
    );
  }
}

export default App;
