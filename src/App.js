import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { FormToAdd } from './components/FormToAdd';

import users from './api/users';
import apiTodos from './api/todos';

class App extends React.Component {
  state = {
    todos: apiTodos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
    counter: 3,
  };

  newTodo = (id, title, completed, user) => {
    this.setState(prev => ({
      todos: [
        ...prev.todos,
        {
          id,
          title,
          completed,
          user,
        },
      ],
      counter: prev.counter + 1,
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <div className="form">
          <FormToAdd
            users={users}
            list={todos}
            newTodo={this.newTodo}
            id={this.state.counter}
          />
        </div>
        <div className="list">
          <TodoList list={todos} />
        </div>
      </div>
    );
  }
}

export default App;
