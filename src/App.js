import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import usersData from './api/users';
import todosData from './api/todos';

function getUser(id) {
  const user = usersData.find(elem => id === elem.id);

  return {
    userName: user.name,
    userId: user.id,
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
    const { users, todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <div className="panel">
          <TodoList todos={todos} />
        </div>

        <div className="panel">
          <Form
            users={users}
            addItem={this.updateTodoList}
            newItemId={Date.now()}
          />
        </div>
      </div>
    );
  }
}

export default App;
