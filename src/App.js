import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

const personTodos = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }
));

export class App extends React.Component {
  state = {
    todos: personTodos,
    lastTodoId: todosFromServer.length,
  }

  addTodo = (query, selectedName) => {
    this.setState(state => (
      {
        lastTodoId: state.lastTodoId + 1,
        todos: [...state.todos,
          {
            title: query,
            completed: false,
            user: { name: selectedName },
            id: state.lastTodoId + 1,
          },
        ],
      }
    ));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm
          todos={todos}
          addTodo={this.addTodo}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}
