import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

import usersOrigin from './api/users';
import todosOrigin from './api/todos';

const todosOriginWithusersOrigin = todosOrigin.map(todo => (
  {
    ...todo,
    user: usersOrigin
      .find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    users: [...usersOrigin],
    todos: [...todosOriginWithusersOrigin],

    valuesMap: {
      todoTitle: '',
      userOwnTodo: '',
    },

    errorsMap: {
      todoTitle: '',
      userOwnTodo: '',
    },
  }

  handleTogle = (togleTodo) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === togleTodo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => {
      const valuesMap = { ...prevState.valuesMap };

      valuesMap[name] = name === this.statetodoTitle
        ? value.replace(/\W*[_]*/g, '')
        : value;

      return ({
        valuesMap,

        errorsMap: {
          todoTitle: '',
          userOwnTodo: '',
        },
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errorsMap = {};

    this.setState((prevState) => {
      if (!prevState.valuesMap.todoTitle) {
        errorsMap.todoTitle = 'Todo field is empty, please add some text';
      }

      if (!prevState.valuesMap.userOwnTodo) {
        errorsMap.userOwnTodo = 'User field is empty, please select the user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      return ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.todos.length + 1,
            title: prevState.valuesMap.todoTitle,
            completed: false,
            user: prevState.users
              .find(user => user.username === prevState.valuesMap.userOwnTodo),
          },
        ],
        valuesMap: {
          todoTitle: '',
          userOwnTodo: '',
        },
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <p>
          <span>users: </span>
          {usersOrigin.length}
        </p>

        <div className="todo-list">
          <AddTodo
            users={this.state.users}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            valuesMap={this.state.valuesMap}
            errorsMap={this.state.errorsMap}
          />

          <TodoList
            todos={this.state.todos}
            handleTogle={this.handleTogle}
          />
        </div>
      </div>
    );
  }
}

export default App;
