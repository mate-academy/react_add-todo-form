import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import Select from './Components/Select';
import Users from './api/users';
import Todos from './api/todos';

export default class App extends Component {
  state = {
    users: Users,
    todos: Todos,
  };

  updateMainState = (id, todosText) => {
    const currentTodos = this.state.todos;

    currentTodos.push({
      userId: id,
      id: currentTodos.length + 1,
      title: todosText,
      completed: false,
    });
    this.setState(state => ({ todos: state.todos }));
  };

  render() {
    const { todos, users } = this.state;

    return (
      <div className="main-wrapper">
        <div className="row">
          <div className="col s12 m6">
            <Select
              usersForSelection={users}
              todos={todos}
              updateMainState={this.updateMainState}
            />
          </div>
        </div>
        <TodoList items={todos} users={users} />
      </div>
    );
  }
}
