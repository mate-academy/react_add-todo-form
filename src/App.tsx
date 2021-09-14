import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { AddTaskForm } from './components/AddTaskForm';

type State = {
  users: Users[];
  todos: Todos[];
};
type Props = {

};

class App extends React.Component<Props, State> {
  state:State = {
    users,
    todos,
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <h2>
          Current count of tasks:
          {' '}
          <span className="Todo__CountNumber">
            {this.state.todos.length}
          </span>
        </h2>
        <p className="Todo__description">To add new task: 1)write task name 2)chose a user</p>
        <AddTaskForm users={this.state.users} />
        <TodoList todos={this.state.todos} users={this.state.users} />
      </div>
    );
  }
}

export default App;
