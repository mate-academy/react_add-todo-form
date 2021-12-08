import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { AddTodo } from './types/AddTodo';

type State = {
  visibleTodos: Todo[];
};

export class App extends React.Component<{}, State> {
  state = {
    visibleTodos: [],
  };

  componentDidMount() {
    const visibleTodos = todos.map(todo => {
      const theRightUser = users.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: theRightUser || null,
      };
    });

    this.setState({ visibleTodos });
  }

  addTodo: AddTodo = (userName, todoTitle) => {
    const selectedUser = users.find(user => user.name === userName);

    if (selectedUser && todoTitle) {
      const newTodo: Todo = {
        userId: selectedUser.id,
        id: +new Date(),
        title: todoTitle,
        completed: false,
        user: selectedUser,
      };

      this.setState(state => {
        return { visibleTodos: [...state.visibleTodos, newTodo] };
      });
    }
  };

  render() {
    return (
      <div className="app">
        <h1>List of todos</h1>

        <TodoList todos={this.state.visibleTodos} />

        <AddTodoForm users={users} addTodo={this.addTodo} />
      </div>
    );
  }
}
