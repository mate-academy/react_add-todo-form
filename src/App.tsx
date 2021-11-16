import React from 'react';

import { TodoList } from './components/Todolist/Todolist';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';

import { Todo } from './types/Todo';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

interface State {
  todos: Todo[],
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: todosFromServer,
  };

  addTodo = (newTitle: string, selectedUser: string) => {
    this.setState((prevState) => {
      const { todos } = prevState;

      const index = users.findIndex(
        user => selectedUser === user.name,
      );

      const newTodo = {
        id: todos.length + 1,
        title: newTitle,
        userId: users[index].id,
      };

      return { todos: [...todos, newTodo] };
    });
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Create new task</h1>
        <TodoAddForm
          todos={todosFromServer}
          onAdd={this.addTodo}
          users={users}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}
