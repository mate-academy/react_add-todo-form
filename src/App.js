import React from 'react';
import './App.css';

import users from './api/users';
import todosFormServer from './api/todos';

import { AddNewTodo } from './components/AddNewTodo/AddNewTodo';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    todos: todosFormServer.map(todo => ({
      ...todo,
      performer: users.find(user => user.id === todo.userId),
    })),

    userId: '',
    titleOfTodo: '',
    completed: 'No',
  };

  toggleCheckbox = (toggleTodo) => {
    this.setState((prevState) => {
      const todos = prevState.todos.map((todo) => {
        if (todo.id !== toggleTodo.id) {
          return todo;
        }

        return {
          ...todo,

          completed: !todo.completed,
        };
      });

      return {
        todos,
      };
    });
  };

  handleTitleOfTodo = (e) => {
    this.setState({
      titleOfTodo: e.target.value,
    });
  };

  handlePerformer = (e) => {
    this.setState({
      userId: e.target.value,
    });
  };

  handleCompleted = (e) => {
    this.setState({
      completed: e.target.value,
    });
  }

  handlSubmit = (e) => {
    e.preventDefault();

    this.setState(({ todos, userId, titleOfTodo, completed }) => ({
      todos: [
        ...todos,
        {
          userId: +userId,
          id: todos.length + 1,
          title: titleOfTodo,
          completed: completed !== 'No',
          performer: users.find(user => user.id === +userId),
        },
      ],
      userId: '',
      titleOfTodo: '',
      completed: 'No',
    }));
  }

  render() {
    const { todos, titleOfTodo, userId, completed } = this.state;

    return (
      <div className="App">
        <AddNewTodo
          users={users}
          titleOfTodo={titleOfTodo}
          handleTitleOfTodo={this.handleTitleOfTodo}
          userId={userId}
          handlePerformer={this.handlePerformer}
          completed={completed}
          handleCompleted={this.handleCompleted}
          handlSubmit={this.handlSubmit}
        />
        <TodoList
          todos={todos}
          toggleCheckbox={this.toggleCheckbox}
        />
      </div>
    );
  }
}

export default App;
