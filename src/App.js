import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './TodoList/TodoList';
import { NewTodo } from './NewTodo/NewTodo';

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

export class App extends React.Component {
  state = {
    todos: preparedTodos,
    newId: todos.length + 1,
  }

  addTodo = (todo) => {
    this.setState(state => (
      {
        todos: [
          ...state.todos,
          {
            ...todo,
          },
        ],
        newId: state.newId + 1,
      }
    ));
  }

  render() {
    return (
      <div className="App">
        <NewTodo
          addTodo={this.addTodo}
          newId={this.state.newId}
        />
        <TodoList
          todos={[...this.state.todos]}
        />
      </div>
    );
  }
}
