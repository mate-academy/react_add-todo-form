import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import usersData from './api/users';
import todosData from './api/todos';

function getUser(id) {
  const userObj = usersData.find(user => id === user.id);

  return {
    userName: userObj.name,
    userId: userObj.id,
  };
}

class App extends React.Component {
  state = {
    todos: todosData.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })),
    users: usersData.map(user => ({
      id: user.id,
      name: user.name,
    })),
  };

  updateTodoList = (newItem) => {
    this.setState(state => ({
      todos: [...state.todos, newItem],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <div className="panel">
          <TodoList todos={this.state.todos} />
        </div>

        <div className="panel">
          <Form
            users={this.state.users}
            addItem={this.updateTodoList}
            newItemId={Math.max(...this.state.todos.map(todo => todo.id)) + 1}
          />
        </div>
      </div>
    );
  }
}

export default App;
